import {VFC} from 'react';
import {GameSelectors} from '../../store/game/game-selectors';
import {GamePieces} from '../molecules/game/GamePieces';
import {GameControls} from '../organisms/game/GameControls';
import {GameEngine} from '../organisms/game/GameEngine';
import {GameNumbers} from '../organisms/game/GameNumbers';
import {usePageView} from '../particles/hooks/usePageView';

export interface GameDesktopProps {
    floatControls: boolean;
}

export const GameDesktop: VFC<GameDesktopProps> = ({floatControls}) => {
    usePageView('/game/desktop');
    return (
        <>
            <div className="grid grid-cols-desktop gap-4 m-auto">
                <div className="flex flex-col">
                    <GamePieces
                        reverse={true}
                        className="p-4"
                        label="Hold"
                        selectPieces={GameSelectors.hold}
                    />
                    <GameNumbers className="flex-col mt-auto gap-4" />
                </div>
                <GameEngine />
                <div className="flex flex-col">
                    <GamePieces
                        className="p-4"
                        label="Next"
                        reverse={true}
                        selectPieces={GameSelectors.next}
                    />
                </div>
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
