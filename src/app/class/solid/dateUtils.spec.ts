import { parseDate } from './dateUtils';

describe('parseDate testing', () => {
    it('має повертати Date для правильного рядка', () => {
        const result = parseDate('2099-01-01');
        expect(result).not.toBeNull();
        expect(result instanceof Date).toBeTrue();
    });

    it('має повертати null для порожнього рядка', () => {
        expect(parseDate('')).toBeNull();
    });

    it('має повертати null для невалідного рядка', () => {
        expect(parseDate('не-дата')).toBeNull();
    });
});