import reducer, {
    initialState,
    showNextSlide,
} from './slideshow';

describe('Report reducer', () => {
    it('should return the current state', () => {
        expect(reducer(initialState, { type: 'SOME_ACTION' })).toEqual(initialState);
    });

    it('should return the correct next state', () => {
        expect(reducer({ currentSlide: 0 }, showNextSlide(3))).toEqual(
            { currentSlide: 1 },
        );
    });

    it('should return the correct next state', () => {
        expect(reducer({ currentSlide: 1 }, showNextSlide(3))).toEqual(
            { currentSlide: 2 },
        );
    });

    it('should return the correct next state', () => {
        expect(reducer({ currentSlide: 2 }, showNextSlide(3))).toEqual(
            { currentSlide: 0 },
        );
    });
});
