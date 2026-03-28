export class CalcRange {
    private a: number;
    private b: number;

    constructor(a: number, b: number) {
        this.a = a;
        this.b = b;
    }

    // Числа кратні 17, які при діленні на 4 дають остачу 2
    public getNumbers(): number[] {
        const numbers: number[] = [];

        for (let i = this.a; i <= this.b; i++) {
            if (i % 17 === 0 && i % 4 === 2) {
                numbers.push(i);
            }
        }

        return numbers;
    }

    // Сума цих чисел
    public getSum(): number {
        let sum = 0;

        for (const n of this.getNumbers()) {
            sum += n;
        }

        return sum;
    }
}