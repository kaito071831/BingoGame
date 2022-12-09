import { Prize } from "../../src/utils/prize";

export type AdminInitMessage = {
    bingoNumbers: number[];
    prizes: Array<Prize>;
}