import {render} from '@testing-library/react';
import {AppLogo} from '../../../../components/atoms/app/AppLogo';

describe(AppLogo.name, () => {
    beforeEach(() => jest.useFakeTimers());

    it('should render the app name', () => {
        const name = 'Example';
        const {getByTestId} = render(<AppLogo name={name} />);
        expect(getByTestId('app-logo')).toHaveTextContent(`welcome to${name}`);
    });

    it('should render each letter with a different color', () => {
        const name = 'Example';
        const {getByTestId} = render(<AppLogo name={name} />);
        Array.from(name).forEach((letter, indx) => {
            const className = getByTestId(`app-logo-${indx}`).className;
            expect(className.startsWith('text-tetro_')).toBeTruthy();
        });
    });

    it('should animate the colors', () => {
        const name = 'Example';
        const speed = 200;
        const {rerender, getByTestId} = render(
            <AppLogo name={name} speed={speed} />
        );

        const current_colors = Array.from(name)
            .map((letter, indx) => getByTestId(`app-logo-${indx}`).className)
            .join(' ');

        expect(current_colors.trim()).toBeTruthy();

        jest.runTimersToTime(speed);

        rerender(<AppLogo name={name} speed={speed} />);

        const next_colors = Array.from(name)
            .map((letter, indx) => getByTestId(`app-logo-${indx}`).className)
            .join(' ');

        expect(next_colors.trim()).toBeTruthy();
        expect(current_colors).not.toEqual(next_colors);
    });
});
