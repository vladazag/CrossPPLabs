export class CalcNumber {
    private a: number;
    private b: number;
    private c: number;

    constructor(a: number, b: number, c: number) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    // Підрахунок кратних 27
    public getCount(): number {
        let count = 0;

        if (this.a % 27 === 0) count++;
        if (this.b % 27 === 0) count++;
        if (this.c % 27 === 0) count++;

        return count;
    }
}