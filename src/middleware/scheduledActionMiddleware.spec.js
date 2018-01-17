import createMiddleware, { tick } from './scheduledActionMiddleware';

const middleware = createMiddleware();
const next = jest.fn();
const store = jest.fn();

describe('Scheduled Action Middleware', () => {
    it('should lift non @@scheduler actions', () => {
        const action = { type: 'SOME_ACTION', payload: 'some_payload' };
        middleware(store)(next)(action);
        expect(next).toHaveBeenCalledWith(action);
        middleware(store)(next)(tick());
        expect(next.mock.calls.length).toBe(1);
    });
});

