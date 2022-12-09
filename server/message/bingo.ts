import { BingoCard } from "../../src/utils/bingo";

export type SpinResultMessage = {
    bingoNumber: number;
}
export type UpdateBingoCardMessage = {
    bingoCard: BingoCard;
}
export type BingoMessage = {
    isBingo: boolean;
}
export type AdminBingoMessage = {
    userId: number;
    userName: string;
}
