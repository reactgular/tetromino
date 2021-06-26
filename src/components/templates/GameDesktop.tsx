import {VFC} from 'react';
import {GameSelectors} from '../../store/game/game-selectors';
import {GamePieces} from '../molecules/game/GamePieces';
import {GameControls} from '../organisms/game/GameControls';
import {GameEngine} from '../organisms/game/GameEngine';
import {GameNumbers} from '../organisms/game/GameNumbers';

export interface GameDesktopProps {
    floatControls: boolean;
}

export const GameDesktop: VFC<GameDesktopProps> = ({floatControls}) => {
    return (
        <>
            <div className="grid grid-cols-desktop gap-4 m-auto">
                <div className="flex flex-col">
                    <GamePieces
                        className="p-4"
                        label="Hold"
                        selectPieces={GameSelectors.hold}
                    />
                    <GameNumbers className="flex-col mt-auto gap-4" />
                </div>
                <GameEngine />
                <GamePieces
                    className="p-4"
                    label="Next"
                    selectPieces={GameSelectors.next}
                />
                {!floatControls && (
                    <GameControls className="col-start-2 mt-5" />
                )}
            </div>
            {floatControls && (
                <div className="flex absolute bottom-0 mb-5 w-full">
                    <div className="grid grid-cols-desktop gap-4 mx-auto">
                        <GameControls
                            className="col-start-2"
                            transparent={true}
                        />
                    </div>
                </div>
            )}
        </>
    );
};
