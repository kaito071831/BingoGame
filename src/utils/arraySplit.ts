export function ArraySplit<T>(arr: T[], splitNumber: number) {
    return arr.reduce((prev: T[][], current, index) => {
        if(index % splitNumber == 0)
            return [...prev, [current]];
        return [...prev.slice(0, -1), [...prev.slice(-1)[0], current]];
    }, []);
}