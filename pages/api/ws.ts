import { NextApiRequest } from "next";
import { Server, Socket } from "socket.io";
import net from "net";
import { NextApiResponseSocketIO } from "../../src/utils/next";
import { UserAuthMessage } from "../../server/message/user";
import { PrismaClient } from "@prisma/client";
import randomstring from "randomstring";
import seedrandom from "seedrandom";
import { BingoCard, BingoRow, checkBingo } from "../../src/utils/bingo";
import { ArraySplit } from "../../src/utils/arraySplit";

export const config = {
    api: {
        bodyParser: false,
    }
}

const prisma = new PrismaClient();
// Map<id, .>
const connections = new Map<number, {socket: Socket}>();

const bingoCardSeed = (new Array(75)).fill(0).map((_, index) => index + 1);
function generateBingoCard(bingoSeeds: string): BingoCard {
    const bingoNumberList = [];
    // 縦
    for(let i = 0; i < 5; i++) {
        const bingoCardSeedCopy = bingoCardSeed.slice(i * 15, (i + 1) * 15);
        // 横
        for(let j = 0; j < 5; j++) {
            const seed = seedrandom(bingoSeeds + i + j);
            const index = Math.floor(seed() * bingoCardSeedCopy.length);
            bingoNumberList.push(bingoCardSeedCopy[index]);
            bingoCardSeedCopy.splice(index, 1);
        }
    }
    const bingoCard = ArraySplit(bingoNumberList.map((value) => ({bingoNumber: value, isHit: false})), 5);
    bingoCard[2][2].isHit = true;
    return bingoCard;
}


export default function handler (req: NextApiRequest, res: NextApiResponseSocketIO) {
    if(!res.socket?.server?.socketio) {
        const httpServer = res.socket.server;
        res.socket.server.socketio = new Server(httpServer, {
            path: "/api/ws",
        });

        res.socket.server.socketio.on("connection", (socket) => {
            socket.on("userRegister", (message: UserAuthMessage) => {
                (async() => {
                    if(prisma) {
                        const user = await prisma.user.create({
                            data: {
                                name: message.name,
                                bingoSeeds: randomstring.generate(12),
                            }
                        });
                        socket.emit("userAuthSuccess", Object.assign({}, user, {
                            bingoCard: generateBingoCard(user.bingoSeeds),
                        }));
                        connections.set(user.id, {socket});
                    }
                })();
            });
            socket.on("userAuth", (message: UserAuthMessage) => {
                (async() => {
                    if(prisma) {
                        const user = await prisma.user.findFirst({
                            where: {
                                name: message.name
                            }
                        });
                        if(user) {
                            socket.emit("userAuthSuccess", Object.assign({}, user, {
                                bingoCard: generateBingoCard(user.bingoSeeds),
                            }));
                            connections.set(user.id, {socket});
                        }
                    }
                })();
            });
            socket.on("spin", () => {
                (async() => {
                    if(prisma) {
                        const arr = await prisma.bingoNumber.findMany();
                        console.log(arr);
                        const bingoCardSeedCopy = [...bingoCardSeed].filter((value) => !arr.some((el) => el.number === value));
                        const bingoNumber = Math.floor(Math.random() * bingoCardSeedCopy.length);
                        socket.emit("spinResult", {bingoNumber});
                        await prisma.bingoNumber.create({
                            data: {
                                number: bingoNumber,
                            }
                        });
                        const bingoNumbers = [...arr, bingoNumber];
                        // 全てのユーザーのビンゴカードを取得
                        const users = await prisma.user.findMany();
                        // 全てのユーザーのビンゴカードを更新
                        for(const user of users) {
                            const bingoCard = generateBingoCard(user.bingoSeeds);
                            for(const [index, value] of bingoCard.entries()) {
                                for(const [index2, row] of value.entries()) {
                                    if(bingoNumbers.includes(row.bingoNumber)) {
                                        bingoCard[index][index2].isHit = true;
                                    }
                                }
                            }
                            connections.get(user.id)?.socket.emit("updateBingoCard", {bingoCard});
                        }
                    }
                })();
            });
        });
    }
    res.end();
}