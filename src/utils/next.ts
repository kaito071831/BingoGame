import net from "net";
import http from "http";
import { NextApiResponse } from "next";
import SocketIO from "socket.io";
import { PrismaClient } from "@prisma/client";

export type NextApiResponseSocketIO = NextApiResponse & {
    socket: net.Socket & {
        server: http.Server & {
            socketio?: SocketIO.Server;
        }
    }
}