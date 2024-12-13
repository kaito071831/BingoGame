import { BingoCard } from "../../src/utils/bingo";

export type UserAuthMessage = {
    name: string;
}
export type UserRegisterMessage = {
    name: string;
}
export type UserAuthSuccessMessage = {
    bingoCard: BingoCard;
    bingoSeeds: string;
    id: number;
}