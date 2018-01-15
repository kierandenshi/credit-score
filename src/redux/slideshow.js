const createAction = type => payload => ({ type, payload });
const NEXT_SLIDE = 'NEXT_SLIDE';

export const showNextSlide = createAction(NEXT_SLIDE);

export const initialState = {
    currentSlide: 0,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case NEXT_SLIDE:
            return {
                ...state,
                currentSlide: state.currentSlide === payload - 1 ? 0 : state.currentSlide + 1,
            };

        default:
            return state;
    }
};
