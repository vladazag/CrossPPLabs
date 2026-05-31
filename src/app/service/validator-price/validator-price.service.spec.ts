import { ValidatorPriceService } from './validator-price.service';

describe('ValidatorPriceService testing', () => {
    let service: ValidatorPriceService;

    beforeEach(() => {
        service = new ValidatorPriceService();
    });

    it('має створюватись', () => {
        expect(service).toBeTruthy();
    });

    it('isPositive() має повертати true для додатного числа', () => {
        expect(service.isPositive(50)).toBeTrue();
    });

    it('isPositive() має повертати false для нуля', () => {
        expect(service.isPositive(0)).toBeFalse();
    });

    it('isPositive() має повертати false для від\'ємного числа', () => {
        expect(service.isPositive(-10)).toBeFalse();
    });

    it('isReasonable() має повертати true для розумної ціни', () => {
        expect(service.isReasonable(500)).toBeTrue();
    });

    it('isReasonable() має повертати false для надто великої ціни', () => {
        expect(service.isReasonable(200000)).toBeFalse();
    });
});