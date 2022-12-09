import { NextApiRequest } from "next";
import { Server, Socket } from "socket.io";
import net from "net";
import { NextApiResponseSocketIO } from "../../src/utils/next";
import { UserAuthMessage } from "../../server/message/user";
import { PrismaClient } from "@prisma/client";
import randomstring from "randomstring";
import seedrandom from "seedrandom";
import { BingoCard, BingoRow, checkBingo, updateBingoCard } from "../../src/utils/bingo";
import { ArraySplit } from "../../src/utils/arraySplit";
import { Prizes, updatePrizes } from "../../src/utils/prize";

export const config = {
    api: {
        bodyParser: false,
    }
}

const prisma = new PrismaClient();
// Map<id, .>
const connections = new Map<number, {socket: Socket}>();
const adminConnections: Array<{socket: Socket}> = [];

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
            let userId: number | null = null;

            socket.on("userRegister", (message: UserAuthMessage) => {
                (async() => {
                    if(prisma) {
                        const user = await prisma.user.create({
                            data: {
                                name: message.name,
                                bingoSeeds: randomstring.generate(12),
                            }
                        });
                        const arr = await prisma.bingoNumber.findMany();
                        const bingoNumbers = arr.map((v) => v.number);
                        socket.emit("userAuthSuccess", Object.assign({}, user, {
                            bingoCard: updateBingoCard(generateBingoCard(user.bingoSeeds), bingoNumbers),
                        }));
                        userId = user.id;
                        connections.set(user.id, {socket});
                    }
                })();
            });
            socket.on("requestAdminInit", () => {
                (async() => {
                    adminConnections.push({socket});
                    const arr = await prisma.bingoNumber.findMany();
                    const bingoNumbers = arr.map((v) => v.number);
                    const existsPrizes = await prisma.hitPrize.findMany();
                    const prizes = updatePrizes([...Prizes], existsPrizes.map((v) => v.id));
                    socket.emit("adminInit", {bingoNumbers, prizes});
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
                            const arr = await prisma.bingoNumber.findMany();
                            const bingoNumbers = arr.map((v) => v.number);
                            socket.emit("userAuthSuccess", Object.assign({}, user, {
                                bingoCard: updateBingoCard(generateBingoCard(user.bingoSeeds), bingoNumbers),
                            }));
                            userId = user.id;
                            connections.set(user.id, {socket});
                        }
                    }
                })();
            });
            socket.on("spin", () => {
                (async() => {
                    if(prisma) {
                        const arr = await prisma.bingoNumber.findMany();
                        const bingoCardSeedCopy = [...bingoCardSeed].filter((value) => !arr.some((el) => el.number === value));
                        console.log(bingoCardSeedCopy);
                        const bingoNumberIndex = Math.floor(Math.random() * bingoCardSeedCopy.length);
                        const bingoNumber = bingoCardSeedCopy[bingoNumberIndex];
                        socket.emit("spinResult", {bingoNumber});
                        await prisma.bingoNumber.create({
                            data: {
                                number: bingoNumber,
                            }
                        });
                        const bingoNumbers = [...arr.map((v) => v.number), bingoNumber];
                        // 全てのユーザーのビンゴカードを取得
                        const users = await prisma.user.findMany();
                        // 全てのユーザーのビンゴカードを更新
                        for(const user of users) {
                            const bingoCard = updateBingoCard(generateBingoCard(user.bingoSeeds), bingoNumbers);
                            const isBingo = checkBingo(bingoCard);
                            connections.get(user.id)?.socket.emit("updateBingoCard", {bingoCard});
                            if(isBingo && !user.isBingo) {
                                connections.get(user.id)?.socket.emit("bingo", {isBingo});
                                socket.emit("bingo", {userId: user.id, userName: user.name});
                            }
                        }
                    }
                })();
            });
            socket.on("requestPrize", () => {
                (async() => {
                    if(prisma && userId != null) {
                        const existsPrizes = await prisma.hitPrize.findMany();
                        const stillPrizes = [...Prizes].filter((value) => !existsPrizes.some((el) => el.id === value.prizeNumber));
                        console.log(stillPrizes);
                        const index = Math.floor(Math.random() * stillPrizes.length);
                        const prizeNumber = stillPrizes[index];

                        await prisma.hitPrize.create({
                            data: {
                                id: prizeNumber.prizeNumber,
                            }
                        });
                        await prisma.user.updateMany({
                            where: {
                                id: userId,
                            },
                            data: {
                                isBingo: true,
                            }
                        });
                        const prizes = updatePrizes([...Prizes], [...existsPrizes.map((v) => v.id), prizeNumber.prizeNumber]);
                        socket.emit("prizeResult", {prizeNumber, prizes});
                        adminConnections.forEach((adminConnection) => adminConnection.socket.emit("prizeResult", {prizeNumber, prizes}));
                    }
                })();
            });
        });
    }
    res.end();
}