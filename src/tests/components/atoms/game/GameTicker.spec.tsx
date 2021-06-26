import {render} from '@testing-library/react';
import {GameTicker} from '../../../../components/atoms/game/GameTicker';

describe(GameTicker.name, () => {
    beforeEach(() => jest.useFakeTimers());

    it('should set an interval by speed', () => {
        const onTick = jest.fn(() => undefined);
        render(<GameTicker speed={500} onTick={onTick} />);
        expect(setInterval).toHaveBeenCalledTimes(1);

        jest.runTimersToTime(2000);
        expect(onTick).toHaveBeenCalledTimes(4);
    });

    it('should change timing when we dispatch speed', () => {
        const onTick = jest.fn(() => undefined);
        const {rerender} = render(<GameTicker speed={100} onTick={onTick} />);
        expect(setInterval).toHaveBeenCalledTimes(1);

        jest.runTimersToTime(1000);
        expect(onTick).toHaveBeenCalledTimes(10);

        rerender(<GameTicker speed={500} onTick={onTick} />);

        jest.runTimersToTime(1000);
        expect(onTick).toHaveBeenCalledTimes(12);
    });
});
