import React, { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { UpdateBingoCardMessage } from "../../server/message/bingo";
import { UserAuthSuccessMessage } from "../../server/message/user";
import { BingoCard } from "../utils/bingo";
import { SocketIOContext } from "./socketio-context";

type SocketIOContextObject = {
    bingoCard: BingoCard;
    setBingoCard: React.Dispatch<React.SetStateAction<BingoCard>>;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    hitNumbers: number[];
    setHitNumbers: React.Dispatch<React.SetStateAction<number[]>>;
}
export const BingoContext = React.createContext<SocketIOContextObject>(null!);

type BingoProviderProps = {
    children: React.ReactNode
}
export function BingoProvider(props: BingoProviderProps) {
    const {socketio} = React.useContext(SocketIOContext);
    const [bingoCard, setBingoCard] = React.useState<BingoCard>([]);
    const [name, setName] = React.useState<string>("");
    const [hitNumbers, setHitNumbers] = React.useState<number[]>([]);

    useEffect(() => {
        const handleUserAuthSuccess = (obj: UserAuthSuccessMessage) => {
            console.log("userAuthSuccess", obj);
            setBingoCard(obj.bingoCard);
        }
        socketio.on("userAuthSuccess", handleUserAuthSuccess);
        const handleUpdateBingoCard = (obj: UpdateBingoCardMessage) => {
            console.log("updateBingoCard", obj);
            setBingoCard(obj.bingoCard);
        }
        socketio.on("updateBingoCard", handleUpdateBingoCard);

        return () => {
            socketio.off("userAuthSuccess", handleUserAuthSuccess);
            socketio.off("updateBingoCard", handleUpdateBingoCard);
        } 
    }, [socketio, setBingoCard]);

    const contextValue = React.useMemo(() => ({
        bingoCard,
        setBingoCard,
        name,
        setName,
        hitNumbers,
        setHitNumbers
    }), [bingoCard, setBingoCard, name, setName, hitNumbers, setHitNumbers]);

    return (
        <BingoContext.Provider value={contextValue}>{props.children}</BingoContext.Provider>
    )
}