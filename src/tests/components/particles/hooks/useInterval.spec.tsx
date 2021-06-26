import {render} from '@testing-library/react';
import {DependencyList, FC} from 'react';
import {useInterval} from '../../../../components/particles/hooks/useInterval';

interface TestIntervalProps {
    callback: () => void;

    deps?: DependencyList;

    ms?: number;
}

const TestInterval: FC<TestIntervalProps> = ({
    callback,
    ms = 100,
    deps = []
}) => {
    useInterval(callback, ms, deps);
    return null;
};

describe(useInterval.name, () => {
    beforeEach(() => jest.useFakeTimers());

    it('should call callback on interval', () => {
        const callback = jest.fn(() => undefined);
        render(<TestInterval callback={callback} />);
        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledTimes(0);

        jest.runTimersToTime(100);
        expect(callback).toHaveBeenCalledTimes(1);

        jest.runTimersToTime(1000);
        expect(callback).toHaveBeenCalledTimes(11);
    });

    it('should reset interval when ms change', () => {
        const callback = jest.fn(() => undefined);
        const {rerender} = render(
            <TestInterval callback={callback} ms={100} />
        );

        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledTimes(0);

        jest.runTimersToTime(100);
        expect(callback).toHaveBeenCalledTimes(1);

        rerender(<TestInterval callback={callback} ms={500} />);
        expect(setInterval).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenCalledTimes(1);

        jest.runTimersToTime(500);
        expect(callback).toHaveBeenCalledTimes(2);
    });

    it('should reset interval when deps change', () => {
        const callback = jest.fn(() => undefined);
        const {rerender} = render(
            <TestInterval callback={callback} deps={[1, 2, 3]} />
        );

        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledTimes(0);

        jest.runTimersToTime(100);
        expect(callback).toHaveBeenCalledTimes(1);

        rerender(<TestInterval callback={callback} deps={[5, 4, 6]} />);
        expect(setInterval).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenCalledTimes(1);

        jest.runTimersToTime(100);
        expect(callback).toHaveBeenCalledTimes(2);
    });

    it('should reset interval when callback changes', () => {
        const callback1 = jest.fn(() => undefined);
        const callback2 = jest.fn(() => undefined);

        const {rerender} = render(<TestInterval callback={callback1} />);

        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(callback1).toHaveBeenCalledTimes(0);
        jest.runTimersToTime(100);
        expect(callback1).toHaveBeenCalledTimes(1);

        rerender(<TestInterval callback={callback2} />);
        expect(setInterval).toHaveBeenCalledTimes(2);
        expect(callback2).toHaveBeenCalledTimes(0);
        jest.runTimersToTime(100);
        expect(callback2).toHaveBeenCalledTimes(1);
    });

    it('should not change interval if params do not change', () => {
        const callback = jest.fn(() => undefined);
        const {rerender} = render(
            <TestInterval callback={callback} ms={200} deps={[1, 2, 3]} />
        );

        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledTimes(0);

        jest.runTimersToTime(200);
        expect(callback).toHaveBeenCalledTimes(1);

        rerender(
            <TestInterval callback={callback} ms={200} deps={[1, 2, 3]} />
        );
        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledTimes(1);

        jest.runTimersToTime(200);
        expect(callback).toHaveBeenCalledTimes(2);
    });
});
