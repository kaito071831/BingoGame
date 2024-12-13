import { Prize } from "../../src/utils/prize";

export type PrizeResultMessage = {
    prizeNumber: Prize;
    prizes: Array<Prize>;
    userId: number;
}