import {FC} from 'react';
import {GameDigits} from '../../atoms/game/GameDigits';
import {GameValue} from '../../atoms/game/GameValue';

export interface GameNumberProps {
    label: string;

    primary?: boolean;

    reverse?: boolean;

    value: number;
}

export const GameNumber: FC<GameNumberProps> = ({
    label,
    primary,
    reverse = false,
    value
}) => {
    return (
        <GameValue label={label} reverse={reverse}>
            <GameDigits
                className="text-[1.25rem] h-[1.9rem] sm:text-2xl sm:h-[2.5rem]"
                digits={7}
                primary={primary}
                value={value}
            />
        </GameValue>
    );
};
