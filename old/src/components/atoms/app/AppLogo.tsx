import classNames from 'classnames';
import {FC} from 'react';
import {useLetters} from '../../particles/hooks/useLetters';
import {ClassNameProps} from '../../particles/particles.types';

export interface AppLogoProps {
    name: string;

    speed?: number;
}

export const AppLogo: FC<AppLogoProps & ClassNameProps> = ({
    name,
    speed = 200,
    className
}) => {
    const [letters, colors] = useLetters(name, speed);
    return (
        <div
            data-testid="app-logo"
            className={classNames('flex flex-col items-center', className)}
        >
            <div className="font-mono text-2xl">welcome to</div>
            <div className="flex text-4xl font-logo font-bold">
                {letters.map(({key, char}) => (
                    <div
                        data-testid={`app-logo-${key}`}
                        className={colors[key]}
                        key={key}
                    >
                        {char}
                    </div>
                ))}
            </div>
        </div>
    );
};
