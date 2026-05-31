import { ValidatorDateService } from './validator-date.service';

describe('ValidatorDateService testing', () => {
    let service: ValidatorDateService;

    beforeEach(() => {
        service = new ValidatorDateService();
    });

    it('має створюватись', () => {
        expect(service).toBeTruthy();
    });

    it('isFutureDate() має повертати true для майбутньої дати', () => {
        expect(service.isFutureDate('2099-01-01')).toBeTrue();
    });

    it('isFutureDate() має повертати false для минулої дати', () => {
        expect(service.isFutureDate('2000-01-01')).toBeFalse();
    });

    it('isFutureDate() має повертати false для невалідної дати', () => {
        expect(service.isFutureDate('не-дата')).toBeFalse();
    });

    it('isValidFormat() має повертати true для правильного формату', () => {
        expect(service.isValidFormat('2099-01-01')).toBeTrue();
    });

    it('isValidFormat() має повертати false для невалідного формату', () => {
        expect(service.isValidFormat('абвгд')).toBeFalse();
    });
});