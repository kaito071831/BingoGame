import React, { useContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { UserAuthSuccessMessage } from "../../server/message/user";
import { BingoContext } from "./bingo-context";

type SocketIOContextObject = {
    socketio: Socket<DefaultEventsMap, DefaultEventsMap>;
}
export const SocketIOContext = React.createContext<SocketIOContextObject>(null!);

type SocketIOProviderProps = {
    children: React.ReactNode
}
export function SocketIOProvider(props: SocketIOProviderProps) {

    const socketio = React.useMemo(() => {
        return io({path: "/api/ws"})
    }, []);
    const contextValue = React.useMemo(() => ({
        socketio,
    }), [socketio]);
    useEffect(() => {
        const handleConnect = () => {
            console.log("connected");
        };
        socketio.on("connect", handleConnect);
        const handleDisconnect = () => {
            console.log("disconnected");
        };
        socketio.on("disconnect", handleDisconnect);
        const handleError = (err: Error) => {
            console.log("error", err);
        };
        socketio.on("error", handleError);

        return () => {
            socketio.off("connect", handleConnect);
            socketio.off("disconnect", handleDisconnect);
            socketio.off("error", handleError);
        }
    }, [socketio]);

    return (
        <SocketIOContext.Provider value={contextValue}>{props.children}</SocketIOContext.Provider>
    )
}