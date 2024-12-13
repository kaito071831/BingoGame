function isBingoLine(bingoCard) {
    return bingoCard.every((el) => el.isHit);
}

function checkVerticalBingo(bingoCard) {
    for (let i = 0; i < bingoCard.length; i++) {
        const column = [...new Array(5)].map((_, j) => {
            return bingoCard[j][i];
        });
        if (isBingoLine(column)) {
            return true;
        }
    }
    return false;
}
function checkHorizontalBingo(bingoCard) {
    for (let i = 0; i < bingoCard.length; i++) {
        if (isBingoLine(bingoCard[i])) {
            return true;
        }
    }
    return false;
}
function checkCrossLineBingo(bingoCard) {
    const crossLineIndexArr = [[], []];

    [...new Array(bingoCard.length)].forEach((_, i) => {
        crossLineIndexArr[0].push([i, i]);
        crossLineIndexArr[1].push([i, bingoCard.length - i - 1]);
    });
    for (let i = 0; i < crossLineIndexArr.length; i++) {
        const crossLine = crossLineIndexArr[i].map((index) => {
            return bingoCard[index[0]][index[1]];
        });
        if (isBingoLine(crossLine)) {
            return true;
        }
    }
    return false;
}

function checkBingo(bingoCard) {
    return checkVerticalBingo(bingoCard) || checkHorizontalBingo(bingoCard) || checkCrossLineBingo(bingoCard);
}

function testCrossLineBingo() {
    console.log(checkCrossLineBingo([
        [{ "bingoNumber": 13, "isHit": false }, { "bingoNumber": 10, "isHit": false }, { "bingoNumber": 6, "isHit": false }, { "bingoNumber": 2, "isHit": false }, { "bingoNumber": 9, "isHit": false }],
        [{ "bingoNumber": 18, "isHit": false }, { "bingoNumber": 17, "isHit": false }, { "bingoNumber": 25, "isHit": false }, { "bingoNumber": 24, "isHit": false }, { "bingoNumber": 23, "isHit": false }],
        [{ "bingoNumber": 37, "isHit": false }, { "bingoNumber": 45, "isHit": false }, { "bingoNumber": 38, "isHit": false }, { "bingoNumber": 40, "isHit": false }, { "bingoNumber": 32, "isHit": false }],
        [{ "bingoNumber": 51, "isHit": false }, { "bingoNumber": 47, "isHit": false }, { "bingoNumber": 52, "isHit": false }, { "bingoNumber": 56, "isHit": false }, { "bingoNumber": 50, "isHit": false }],
        [{ "bingoNumber": 62, "isHit": false }, { "bingoNumber": 67, "isHit": false }, { "bingoNumber": 75, "isHit": false }, { "bingoNumber": 61, "isHit": false }, { "bingoNumber": 65, "isHit": false }]
    ]));
    console.log(checkCrossLineBingo([
        [{ "bingoNumber": 13, "isHit": true }, { "bingoNumber": 10, "isHit": false }, { "bingoNumber": 6, "isHit": false }, { "bingoNumber": 2, "isHit": false }, { "bingoNumber": 9, "isHit": false }],
        [{ "bingoNumber": 18, "isHit": true }, { "bingoNumber": 17, "isHit": false }, { "bingoNumber": 25, "isHit": false }, { "bingoNumber": 24, "isHit": false }, { "bingoNumber": 23, "isHit": false }],
        [{ "bingoNumber": 37, "isHit": true }, { "bingoNumber": 45, "isHit": false }, { "bingoNumber": 38, "isHit": false }, { "bingoNumber": 40, "isHit": false }, { "bingoNumber": 32, "isHit": false }],
        [{ "bingoNumber": 51, "isHit": true }, { "bingoNumber": 47, "isHit": false }, { "bingoNumber": 52, "isHit": false }, { "bingoNumber": 56, "isHit": false }, { "bingoNumber": 50, "isHit": false }],
        [{ "bingoNumber": 62, "isHit": true }, { "bingoNumber": 67, "isHit": false }, { "bingoNumber": 75, "isHit": false }, { "bingoNumber": 61, "isHit": false }, { "bingoNumber": 65, "isHit": false }]
    ]));
    console.log(checkCrossLineBingo([
        [{ "bingoNumber": 13, "isHit": true }, { "bingoNumber": 10, "isHit": true }, { "bingoNumber": 6, "isHit": true }, { "bingoNumber": 2, "isHit": true }, { "bingoNumber": 9, "isHit": true }],
        [{ "bingoNumber": 18, "isHit": false }, { "bingoNumber": 17, "isHit": false }, { "bingoNumber": 25, "isHit": false }, { "bingoNumber": 24, "isHit": false }, { "bingoNumber": 23, "isHit": false }],
        [{ "bingoNumber": 37, "isHit": false }, { "bingoNumber": 45, "isHit": false }, { "bingoNumber": 38, "isHit": false }, { "bingoNumber": 40, "isHit": false }, { "bingoNumber": 32, "isHit": false }],
        [{ "bingoNumber": 51, "isHit": false }, { "bingoNumber": 47, "isHit": false }, { "bingoNumber": 52, "isHit": false }, { "bingoNumber": 56, "isHit": false }, { "bingoNumber": 50, "isHit": false }],
        [{ "bingoNumber": 62, "isHit": false }, { "bingoNumber": 67, "isHit": false }, { "bingoNumber": 75, "isHit": false }, { "bingoNumber": 61, "isHit": false }, { "bingoNumber": 65, "isHit": false }]
    ]));
    console.log(checkCrossLineBingo([
        [{ "bingoNumber": 13, "isHit": true }, { "bingoNumber": 10, "isHit": false }, { "bingoNumber": 6, "isHit": false }, { "bingoNumber": 2, "isHit": false }, { "bingoNumber": 9, "isHit": false }],
        [{ "bingoNumber": 18, "isHit": false }, { "bingoNumber": 17, "isHit": true }, { "bingoNumber": 25, "isHit": false }, { "bingoNumber": 24, "isHit": false }, { "bingoNumber": 23, "isHit": false }],
        [{ "bingoNumber": 37, "isHit": false }, { "bingoNumber": 45, "isHit": false }, { "bingoNumber": 38, "isHit": true }, { "bingoNumber": 40, "isHit": false }, { "bingoNumber": 32, "isHit": false }],
        [{ "bingoNumber": 51, "isHit": false }, { "bingoNumber": 47, "isHit": false }, { "bingoNumber": 52, "isHit": false }, { "bingoNumber": 56, "isHit": true }, { "bingoNumber": 50, "isHit": false }],
        [{ "bingoNumber": 62, "isHit": false }, { "bingoNumber": 67, "isHit": false }, { "bingoNumber": 75, "isHit": false }, { "bingoNumber": 61, "isHit": false }, { "bingoNumber": 65, "isHit": true }]
    ]));
    console.log(checkCrossLineBingo([
        [{ "bingoNumber": 13, "isHit": false }, { "bingoNumber": 10, "isHit": false }, { "bingoNumber": 6, "isHit": false }, { "bingoNumber": 2, "isHit": false }, { "bingoNumber": 9, "isHit": true }],
        [{ "bingoNumber": 18, "isHit": false }, { "bingoNumber": 17, "isHit": false }, { "bingoNumber": 25, "isHit": false }, { "bingoNumber": 24, "isHit": true }, { "bingoNumber": 23, "isHit": false }],
        [{ "bingoNumber": 37, "isHit": false }, { "bingoNumber": 45, "isHit": false }, { "bingoNumber": 38, "isHit": true }, { "bingoNumber": 40, "isHit": false }, { "bingoNumber": 32, "isHit": false }],
        [{ "bingoNumber": 51, "isHit": false }, { "bingoNumber": 47, "isHit": true }, { "bingoNumber": 52, "isHit": false }, { "bingoNumber": 56, "isHit": false }, { "bingoNumber": 50, "isHit": false }],
        [{ "bingoNumber": 62, "isHit": true }, { "bingoNumber": 67, "isHit": false }, { "bingoNumber": 75, "isHit": false }, { "bingoNumber": 61, "isHit": false }, { "bingoNumber": 65, "isHit": false }]
    ]));
}
function testVerticalBingo() {
    console.log(checkVerticalBingo([
        [{ "bingoNumber": 13, "isHit": false }, { "bingoNumber": 10, "isHit": false }, { "bingoNumber": 6, "isHit": false }, { "bingoNumber": 2, "isHit": false }, { "bingoNumber": 9, "isHit": false }],
        [{ "bingoNumber": 18, "isHit": false }, { "bingoNumber": 17, "isHit": false }, { "bingoNumber": 25, "isHit": false }, { "bingoNumber": 24, "isHit": false }, { "bingoNumber": 23, "isHit": false }],
        [{ "bingoNumber": 37, "isHit": false }, { "bingoNumber": 45, "isHit": false }, { "bingoNumber": 38, "isHit": false }, { "bingoNumber": 40, "isHit": false }, { "bingoNumber": 32, "isHit": false }],
        [{ "bingoNumber": 51, "isHit": false }, { "bingoNumber": 47, "isHit": false }, { "bingoNumber": 52, "isHit": false }, { "bingoNumber": 56, "isHit": false }, { "bingoNumber": 50, "isHit": false }],
        [{ "bingoNumber": 62, "isHit": false }, { "bingoNumber": 67, "isHit": false }, { "bingoNumber": 75, "isHit": false }, { "bingoNumber": 61, "isHit": false }, { "bingoNumber": 65, "isHit": false }]
    ]));
    console.log(checkVerticalBingo([
        [{ "bingoNumber": 13, "isHit": true }, { "bingoNumber": 10, "isHit": false }, { "bingoNumber": 6, "isHit": false }, { "bingoNumber": 2, "isHit": false }, { "bingoNumber": 9, "isHit": false }],
        [{ "bingoNumber": 18, "isHit": true }, { "bingoNumber": 17, "isHit": false }, { "bingoNumber": 25, "isHit": false }, { "bingoNumber": 24, "isHit": false }, { "bingoNumber": 23, "isHit": false }],
        [{ "bingoNumber": 37, "isHit": true }, { "bingoNumber": 45, "isHit": false }, { "bingoNumber": 38, "isHit": false }, { "bingoNumber": 40, "isHit": false }, { "bingoNumber": 32, "isHit": false }],
        [{ "bingoNumber": 51, "isHit": true }, { "bingoNumber": 47, "isHit": false }, { "bingoNumber": 52, "isHit": false }, { "bingoNumber": 56, "isHit": false }, { "bingoNumber": 50, "isHit": false }],
        [{ "bingoNumber": 62, "isHit": true }, { "bingoNumber": 67, "isHit": false }, { "bingoNumber": 75, "isHit": false }, { "bingoNumber": 61, "isHit": false }, { "bingoNumber": 65, "isHit": false }]
    ]));
    console.log(checkVerticalBingo([
        [{ "bingoNumber": 13, "isHit": true }, { "bingoNumber": 10, "isHit": true }, { "bingoNumber": 6, "isHit": true }, { "bingoNumber": 2, "isHit": true }, { "bingoNumber": 9, "isHit": true }],
        [{ "bingoNumber": 18, "isHit": false }, { "bingoNumber": 17, "isHit": false }, { "bingoNumber": 25, "isHit": false }, { "bingoNumber": 24, "isHit": false }, { "bingoNumber": 23, "isHit": false }],
        [{ "bingoNumber": 37, "isHit": false }, { "bingoNumber": 45, "isHit": false }, { "bingoNumber": 38, "isHit": false }, { "bingoNumber": 40, "isHit": false }, { "bingoNumber": 32, "isHit": false }],
        [{ "bingoNumber": 51, "isHit": false }, { "bingoNumber": 47, "isHit": false }, { "bingoNumber": 52, "isHit": false }, { "bingoNumber": 56, "isHit": false }, { "bingoNumber": 50, "isHit": false }],
        [{ "bingoNumber": 62, "isHit": false }, { "bingoNumber": 67, "isHit": false }, { "bingoNumber": 75, "isHit": false }, { "bingoNumber": 61, "isHit": false }, { "bingoNumber": 65, "isHit": false }]
    ]));
    console.log(checkVerticalBingo([
        [{ "bingoNumber": 13, "isHit": true }, { "bingoNumber": 10, "isHit": false }, { "bingoNumber": 6, "isHit": false }, { "bingoNumber": 2, "isHit": false }, { "bingoNumber": 9, "isHit": false }],
        [{ "bingoNumber": 18, "isHit": false }, { "bingoNumber": 17, "isHit": true }, { "bingoNumber": 25, "isHit": false }, { "bingoNumber": 24, "isHit": false }, { "bingoNumber": 23, "isHit": false }],
        [{ "bingoNumber": 37, "isHit": false }, { "bingoNumber": 45, "isHit": false }, { "bingoNumber": 38, "isHit": true }, { "bingoNumber": 40, "isHit": false }, { "bingoNumber": 32, "isHit": false }],
        [{ "bingoNumber": 51, "isHit": false }, { "bingoNumber": 47, "isHit": false }, { "bingoNumber": 52, "isHit": false }, { "bingoNumber": 56, "isHit": true }, { "bingoNumber": 50, "isHit": false }],
        [{ "bingoNumber": 62, "isHit": false }, { "bingoNumber": 67, "isHit": false }, { "bingoNumber": 75, "isHit": false }, { "bingoNumber": 61, "isHit": false }, { "bingoNumber": 65, "isHit": true }]
    ]));
}
function testHorizonBngo() {
    console.log(checkHorizontalBingo([
        [{ "bingoNumber": 13, "isHit": false }, { "bingoNumber": 10, "isHit": false }, { "bingoNumber": 6, "isHit": false }, { "bingoNumber": 2, "isHit": false }, { "bingoNumber": 9, "isHit": false }],
        [{ "bingoNumber": 18, "isHit": false }, { "bingoNumber": 17, "isHit": false }, { "bingoNumber": 25, "isHit": false }, { "bingoNumber": 24, "isHit": false }, { "bingoNumber": 23, "isHit": false }],
        [{ "bingoNumber": 37, "isHit": false }, { "bingoNumber": 45, "isHit": false }, { "bingoNumber": 38, "isHit": false }, { "bingoNumber": 40, "isHit": false }, { "bingoNumber": 32, "isHit": false }],
        [{ "bingoNumber": 51, "isHit": false }, { "bingoNumber": 47, "isHit": false }, { "bingoNumber": 52, "isHit": false }, { "bingoNumber": 56, "isHit": false }, { "bingoNumber": 50, "isHit": false }],
        [{ "bingoNumber": 62, "isHit": false }, { "bingoNumber": 67, "isHit": false }, { "bingoNumber": 75, "isHit": false }, { "bingoNumber": 61, "isHit": false }, { "bingoNumber": 65, "isHit": false }]
    ]));
    console.log(checkHorizontalBingo([
        [{ "bingoNumber": 13, "isHit": true }, { "bingoNumber": 10, "isHit": false }, { "bingoNumber": 6, "isHit": false }, { "bingoNumber": 2, "isHit": false }, { "bingoNumber": 9, "isHit": false }],
        [{ "bingoNumber": 18, "isHit": true }, { "bingoNumber": 17, "isHit": false }, { "bingoNumber": 25, "isHit": false }, { "bingoNumber": 24, "isHit": false }, { "bingoNumber": 23, "isHit": false }],
        [{ "bingoNumber": 37, "isHit": true }, { "bingoNumber": 45, "isHit": false }, { "bingoNumber": 38, "isHit": false }, { "bingoNumber": 40, "isHit": false }, { "bingoNumber": 32, "isHit": false }],
        [{ "bingoNumber": 51, "isHit": true }, { "bingoNumber": 47, "isHit": false }, { "bingoNumber": 52, "isHit": false }, { "bingoNumber": 56, "isHit": false }, { "bingoNumber": 50, "isHit": false }],
        [{ "bingoNumber": 62, "isHit": true }, { "bingoNumber": 67, "isHit": false }, { "bingoNumber": 75, "isHit": false }, { "bingoNumber": 61, "isHit": false }, { "bingoNumber": 65, "isHit": false }]
    ]));
    console.log(checkHorizontalBingo([
        [{ "bingoNumber": 13, "isHit": true }, { "bingoNumber": 10, "isHit": true }, { "bingoNumber": 6, "isHit": true }, { "bingoNumber": 2, "isHit": true }, { "bingoNumber": 9, "isHit": true }],
        [{ "bingoNumber": 18, "isHit": false }, { "bingoNumber": 17, "isHit": false }, { "bingoNumber": 25, "isHit": false }, { "bingoNumber": 24, "isHit": false }, { "bingoNumber": 23, "isHit": false }],
        [{ "bingoNumber": 37, "isHit": false }, { "bingoNumber": 45, "isHit": false }, { "bingoNumber": 38, "isHit": false }, { "bingoNumber": 40, "isHit": false }, { "bingoNumber": 32, "isHit": false }],
        [{ "bingoNumber": 51, "isHit": false }, { "bingoNumber": 47, "isHit": false }, { "bingoNumber": 52, "isHit": false }, { "bingoNumber": 56, "isHit": false }, { "bingoNumber": 50, "isHit": false }],
        [{ "bingoNumber": 62, "isHit": false }, { "bingoNumber": 67, "isHit": false }, { "bingoNumber": 75, "isHit": false }, { "bingoNumber": 61, "isHit": false }, { "bingoNumber": 65, "isHit": false }]
    ]));
    console.log(checkHorizontalBingo([
        [{ "bingoNumber": 13, "isHit": true }, { "bingoNumber": 10, "isHit": false }, { "bingoNumber": 6, "isHit": false }, { "bingoNumber": 2, "isHit": false }, { "bingoNumber": 9, "isHit": false }],
        [{ "bingoNumber": 18, "isHit": false }, { "bingoNumber": 17, "isHit": true }, { "bingoNumber": 25, "isHit": false }, { "bingoNumber": 24, "isHit": false }, { "bingoNumber": 23, "isHit": false }],
        [{ "bingoNumber": 37, "isHit": false }, { "bingoNumber": 45, "isHit": false }, { "bingoNumber": 38, "isHit": true }, { "bingoNumber": 40, "isHit": false }, { "bingoNumber": 32, "isHit": false }],
        [{ "bingoNumber": 51, "isHit": false }, { "bingoNumber": 47, "isHit": false }, { "bingoNumber": 52, "isHit": false }, { "bingoNumber": 56, "isHit": true }, { "bingoNumber": 50, "isHit": false }],
        [{ "bingoNumber": 62, "isHit": false }, { "bingoNumber": 67, "isHit": false }, { "bingoNumber": 75, "isHit": false }, { "bingoNumber": 61, "isHit": false }, { "bingoNumber": 65, "isHit": true }]
    ]));
}
function testBingo() {
    console.log(checkBingo([
        [{ "bingoNumber": 13, "isHit": false }, { "bingoNumber": 10, "isHit": false }, { "bingoNumber": 6, "isHit": false }, { "bingoNumber": 2, "isHit": false }, { "bingoNumber": 9, "isHit": false }],
        [{ "bingoNumber": 18, "isHit": false }, { "bingoNumber": 17, "isHit": false }, { "bingoNumber": 25, "isHit": false }, { "bingoNumber": 24, "isHit": false }, { "bingoNumber": 23, "isHit": false }],
        [{ "bingoNumber": 37, "isHit": false }, { "bingoNumber": 45, "isHit": false }, { "bingoNumber": 38, "isHit": false }, { "bingoNumber": 40, "isHit": false }, { "bingoNumber": 32, "isHit": false }],
        [{ "bingoNumber": 51, "isHit": false }, { "bingoNumber": 47, "isHit": false }, { "bingoNumber": 52, "isHit": false }, { "bingoNumber": 56, "isHit": false }, { "bingoNumber": 50, "isHit": false }],
        [{ "bingoNumber": 62, "isHit": false }, { "bingoNumber": 67, "isHit": false }, { "bingoNumber": 75, "isHit": false }, { "bingoNumber": 61, "isHit": false }, { "bingoNumber": 65, "isHit": false }]
    ]));
    console.log(checkBingo([
        [{ "bingoNumber": 13, "isHit": true }, { "bingoNumber": 10, "isHit": false }, { "bingoNumber": 6, "isHit": false }, { "bingoNumber": 2, "isHit": false }, { "bingoNumber": 9, "isHit": false }],
        [{ "bingoNumber": 18, "isHit": true }, { "bingoNumber": 17, "isHit": false }, { "bingoNumber": 25, "isHit": false }, { "bingoNumber": 24, "isHit": false }, { "bingoNumber": 23, "isHit": false }],
        [{ "bingoNumber": 37, "isHit": true }, { "bingoNumber": 45, "isHit": false }, { "bingoNumber": 38, "isHit": false }, { "bingoNumber": 40, "isHit": false }, { "bingoNumber": 32, "isHit": false }],
        [{ "bingoNumber": 51, "isHit": true }, { "bingoNumber": 47, "isHit": false }, { "bingoNumber": 52, "isHit": false }, { "bingoNumber": 56, "isHit": false }, { "bingoNumber": 50, "isHit": false }],
        [{ "bingoNumber": 62, "isHit": true }, { "bingoNumber": 67, "isHit": false }, { "bingoNumber": 75, "isHit": false }, { "bingoNumber": 61, "isHit": false }, { "bingoNumber": 65, "isHit": false }]
    ]));
    console.log(checkBingo([
        [{ "bingoNumber": 13, "isHit": true }, { "bingoNumber": 10, "isHit": true }, { "bingoNumber": 6, "isHit": true }, { "bingoNumber": 2, "isHit": true }, { "bingoNumber": 9, "isHit": true }],
        [{ "bingoNumber": 18, "isHit": false }, { "bingoNumber": 17, "isHit": false }, { "bingoNumber": 25, "isHit": false }, { "bingoNumber": 24, "isHit": false }, { "bingoNumber": 23, "isHit": false }],
        [{ "bingoNumber": 37, "isHit": false }, { "bingoNumber": 45, "isHit": false }, { "bingoNumber": 38, "isHit": false }, { "bingoNumber": 40, "isHit": false }, { "bingoNumber": 32, "isHit": false }],
        [{ "bingoNumber": 51, "isHit": false }, { "bingoNumber": 47, "isHit": false }, { "bingoNumber": 52, "isHit": false }, { "bingoNumber": 56, "isHit": false }, { "bingoNumber": 50, "isHit": false }],
        [{ "bingoNumber": 62, "isHit": false }, { "bingoNumber": 67, "isHit": false }, { "bingoNumber": 75, "isHit": false }, { "bingoNumber": 61, "isHit": false }, { "bingoNumber": 65, "isHit": false }]
    ]));
    console.log(checkBingo([
        [{ "bingoNumber": 13, "isHit": true }, { "bingoNumber": 10, "isHit": false }, { "bingoNumber": 6, "isHit": false }, { "bingoNumber": 2, "isHit": false }, { "bingoNumber": 9, "isHit": false }],
        [{ "bingoNumber": 18, "isHit": false }, { "bingoNumber": 17, "isHit": true }, { "bingoNumber": 25, "isHit": false }, { "bingoNumber": 24, "isHit": false }, { "bingoNumber": 23, "isHit": false }],
        [{ "bingoNumber": 37, "isHit": false }, { "bingoNumber": 45, "isHit": false }, { "bingoNumber": 38, "isHit": true }, { "bingoNumber": 40, "isHit": false }, { "bingoNumber": 32, "isHit": false }],
        [{ "bingoNumber": 51, "isHit": false }, { "bingoNumber": 47, "isHit": false }, { "bingoNumber": 52, "isHit": false }, { "bingoNumber": 56, "isHit": true }, { "bingoNumber": 50, "isHit": false }],
        [{ "bingoNumber": 62, "isHit": false }, { "bingoNumber": 67, "isHit": false }, { "bingoNumber": 75, "isHit": false }, { "bingoNumber": 61, "isHit": false }, { "bingoNumber": 65, "isHit": true }]
    ]));
}
console.log("cross");
testCrossLineBingo();
console.log("horizon");
testHorizonBngo();
console.log("vertical");
testVerticalBingo();
console.log("bingo");
testBingo();