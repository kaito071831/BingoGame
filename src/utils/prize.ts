export type Prize = {
    prizeNumber: number;
    isHit: boolean;
}
export const Prizes: Array<Prize> = (new Array(38)).fill(0).map((_, index) => ({prizeNumber: index + 1, isHit: false}));

export function updatePrizes(prizes: Array<Prize>, existsPrizes: number[]) {
    for(const [index, value] of prizes.entries()) {
        if(existsPrizes.includes(value.prizeNumber)) {
            prizes[index].isHit = true;
        }
    }
    return prizes;
}