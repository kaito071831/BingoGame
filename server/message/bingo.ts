import { BingoCard } from "../../src/utils/bingo";

export type SpinResultMessage = {
    bingoNumber: number;
}
export type UpdateBingoCardMessage = {
    bingoCard: BingoCard;
}