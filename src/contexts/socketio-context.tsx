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
    const { setBingoCard } = useContext(BingoContext);

    const socketio = React.useMemo(() => {
        return io({path: "/api/ws"})
    }, []);
    const contextValue = React.useMemo(() => ({
        socketio,
    }), [socketio]);
    useEffect(() => {
        socketio.on("connect", () => {
            console.log("connected");
        });
        socketio.on("disconnect", () => {
            console.log("disconnected");
        });
        socketio.on("error", (err) => {
            console.log("error", err);
        });

        socketio.on("userAuthSuccess", (obj: UserAuthSuccessMessage) => {
            console.log("userAuthSuccess", obj);
            setBingoCard(obj.bingoCard);
        });
    }, [socketio, setBingoCard]);

    return (
        <SocketIOContext.Provider value={contextValue}>{props.children}</SocketIOContext.Provider>
    )
}