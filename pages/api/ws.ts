import { NextApiRequest } from "next";
import { Server } from "socket.io";
import net from "net";
import { NextApiResponseSocketIO } from "../../src/utils/next";
import { UserAuthMessage } from "../../server/message/user";
import { PrismaClient } from "@prisma/client";
import randomstring from "randomstring";
import seedrandom from "seedrandom";
import { BingoCard, BingoRow } from "../../src/utils/bingo";
import { ArraySplit } from "../../src/utils/arraySplit";

export const config = {
    api: {
        bodyParser: false,
    }
}

const prisma = new PrismaClient();

const bingoCardSeed = (new Array(75)).fill(0).map((_, index) => index + 1);
function generateBingoCard(bingoSeeds: string): BingoCard {
    const bingoCard = [];
    // 縦
    for(let i = 0; i < 5; i++) {
        const bingoCardSeedCopy = bingoCardSeed.slice(i * 15, (i + 1) * 15);
        // 横
        for(let j = 0; j < 5; j++) {
            const seed = seedrandom(bingoSeeds + i + j);
            const index = Math.floor(seed() * bingoCardSeedCopy.length);
            bingoCard.push(bingoCardSeedCopy[index]);
            bingoCardSeedCopy.splice(index, 1);
        }
    }
    return ArraySplit(bingoCard.map((value) => ({bingoNumber: value, isHit: false})), 5);
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
                        }
                    }
                })();
            });
            socket.on("spin", () => {
                (async() => {
                    if(prisma) {
                        const arr = await prisma.bingoNumber.findMany();
                        const bingoCardSeedCopy = [...bingoCardSeed].filter((value) => !arr.some((el) => el.number === value));
                        const bingoNumber = Math.floor(Math.random() * bingoCardSeedCopy.length);
                        res.socket.server.socketio?.emit("spinResult", {bingoNumber});
                        const bingo = await prisma.bingo.create({});
                    }
                })();
            }
            });
        });
    }
    res.end();
}