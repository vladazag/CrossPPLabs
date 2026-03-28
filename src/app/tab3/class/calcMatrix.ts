export class CalcMatrix {
    private matrix: number[][];
    private n: number;

    constructor(n: number) {
        this.n = n;
        this.matrix = [];
        this.generateMatrix();
    }

    private generateMatrix(): void {
        for (let i = 0; i < this.n; i++) {
            const row: number[] = [];
            for (let j = 0; j < this.n; j++) {
                row.push(Math.floor(Math.random() * 10));
            }
            this.matrix.push(row);
        }
    }

    public getMatrix(): number[][] {
        return this.matrix;
    }

    public getRowSums(): number[] {
        const sums: number[] = [];

        for (let i = 0; i < this.n; i++) {
            let sum = 0;
            for (let j = 0; j < this.n; j++) {
                sum += this.matrix[i][j];
            }
            sums.push(sum);
        }

        return sums;
    }
}