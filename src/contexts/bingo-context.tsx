import React, { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { BingoCard } from "../utils/bingo";

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
    const [bingoCard, setBingoCard] = React.useState<BingoCard>([]);
    const [name, setName] = React.useState<string>("");
    const [hitNumbers, setHitNumbers] = React.useState<number[]>([]);
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