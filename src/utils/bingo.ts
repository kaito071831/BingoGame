export type BingoRow = {
    bingoNumber: number;
    isHit: boolean;
}

export type BingoCard = Array<Array<BingoRow>>;

function isBingoLine(bingoCard: BingoRow[]) {
    return bingoCard.every((el) => el.isHit);
  }

function checkVerticalBingo(bingoCard: BingoCard) {
    for(let i = 0; i < bingoCard.length; i++) {
        const column = [...new Array(5)].map((_, j) => {
            return bingoCard[j][i];
        });
        if(isBingoLine(column)) {
            return true;
        }
    }
    return false;
}
function checkHorizontalBingo(bingoCard: BingoCard) {
    for(let i = 0; i < bingoCard.length; i++) {
        if(isBingoLine(bingoCard[i])) {
            return true;
        }
    }
    return false;
}
function checkCrossLineBingo(bingoCard: BingoCard) {
    const crossLineIndexArr: number[][] = [[], []];

    [...new Array(bingoCard.length)].forEach((_, i) => {
        crossLineIndexArr[0].push(i, i);
        crossLineIndexArr[1].push(i, bingoCard.length - i - 1);
    });
    for(let i=0; i < crossLineIndexArr.length; i++) {
        const crossLine = crossLineIndexArr[i].map((index) => {
            return bingoCard[index][index];
        });
        if(isBingoLine(crossLine)) {
            return true;
        }
    }
    return false;
}

export function checkBingo(bingoCard: BingoCard) {
    return checkVerticalBingo(bingoCard) || checkHorizontalBingo(bingoCard) || checkCrossLineBingo(bingoCard);
}

export function updateBingoCard(bingoCard: BingoCard, bingoNumbers: number[]) {
    for(const [index, value] of bingoCard.entries()) {
        for(const [index2, row] of value.entries()) {
            if(bingoNumbers.includes(row.bingoNumber)) {
                bingoCard[index][index2].isHit = true;
            }
        }
    }
    return bingoCard;
}