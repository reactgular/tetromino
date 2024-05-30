import {Story} from '@storybook/react';
import {useMemo, useState} from 'react';
import {DesignDisplay} from '../../components/molecules/design/DesignDisplay';
import {DesignEditor} from '../../components/molecules/design/DesignEditor';
import {GamePieceRotations} from '../../engine/game-player';
import {StoryMeta} from '../particles/story-meta';

export default StoryMeta(`utilities`);

export const Designer: Story = () => {
    const [pieces, setPieces] = useState<GamePieceRotations>([]);
    const sourceCode = useMemo(() => {
        return [
            'const PIECE: GamePieceRotations = [',
            ...pieces.map((arr) => `  ${JSON.stringify(arr)},`),
            '];'
        ].join('\n');
    }, [pieces]);
    return (
        <div className="flex">
            <DesignEditor
                className="mb-auto"
                onCreate={(piece) => setPieces([...pieces, piece])}
            />
            <div className="flex flex-col ml-4">
                {pieces.map((piece, indx) => (
                    <div key={indx} className="flex mb-4">
                        <DesignDisplay values={piece} />
                        <pre className="ml-4">{JSON.stringify(piece)}</pre>
                    </div>
                ))}
            </div>
            <div className="flex flex-col ml-4">
                <pre>{sourceCode}</pre>
            </div>
        </div>
    );
};
