import { format } from './localisation';

describe('Format function', () => {
    const formatGB = format('en-GB');
    const formatUSA = format('en-US');

    it('should return formatted number', () => {
        expect(formatGB.number(25320)).toEqual('25,320');
        expect(formatUSA.number(25320)).toEqual('25,320');
    });

    it('should return formatted currency', () => {
        expect(formatGB.currency(25320)).toEqual('£25,320.00');
        expect(formatUSA.currency(25320)).toEqual('$25,320.00');
    });
});
