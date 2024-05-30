import {GameBuffer} from './game-buffer';
import {GameCell, GHOST_OPACITY} from './game-cell';
import {GAME_PIECES, GameGhost, GamePlayer} from './game-player';

const MIN_GHOST = 0.05;
const MAX_GHOST = 0.2;

/**
 * A flat collection of cells that makes rendering the screen quicker.
 */
export type GameScreen = Array<GameCell>;

/**
 * Defines a function for a screen coordinate.
 */
export type GameScreenCoords = (x: number, y: number) => void;

/**
 * Generates a flat array of cells and highlights cells that are part of a row
 * being removed.
 */
export function* gameScreenFlatten({
    rows,
    width,
    height
}: GameBuffer): IterableIterator<GameCell> {
    for (let y = 0; y < height; y++) {
        const {cells, removed: glow} = rows[y];
        for (let x = 0; x < width; x++) {
            yield {type: cells[x].type, glow};
        }
    }
}

/**
 * Renders the screen from a buffer and includes an optional player piece.
 */
export function gameScreenRender(
    buffer: Readonly<GameBuffer>,
    player?: Readonly<GamePlayer>,
    ghost?: Readonly<GameGhost>,
    streak_y?: number
): GameScreen {
    const {width} = buffer;
    const screen = Array.from(gameScreenFlatten(buffer));
    if (player) {
        const writerGhost = gameScreenWriter(screen, width, (cell) => {
            cell.type = player.type;
            cell.ghost = GHOST_OPACITY;
        });

        const writerPlayer = gameScreenWriter(screen, width, (cell) => {
            cell.type = player.type;
            cell.ghost = undefined;
        });

        const dist = player!.y - streak_y!;
        const percent = (y: number) => (y - streak_y!) / dist;
        const writerDrop = gameScreenWriter(screen, width, (cell, x, y) => {
            if (!cell.type) {
                cell.type = player!.type;
                cell.ghost = (MAX_GHOST - MIN_GHOST) * percent(y) + MIN_GHOST;
            }
        });

        const piece = GAME_PIECES[player.type][player.rotate];

        piece.forEach(([offset_x, offset_y]) => {
            if (ghost) {
                writerGhost(ghost.x + offset_x, ghost.y + offset_y);
            }

            writerPlayer(player.x + offset_x, player.y + offset_y);

            if (streak_y !== undefined) {
                for (let y = streak_y; y < player!.y; y++) {
                    writerDrop(player!.x + offset_x, y + offset_y);
                }
            }
        });
    }
    return screen;
}

/**
 * Creates a writer function that updates the screen.
 */
export function gameScreenWriter(
    screen: GameScreen,
    width: number,
    write: (cell: GameCell, x: number, y: number) => void
): GameScreenCoords {
    return (x: number, y: number) => {
        write(screen[y * width + x], x, y);
    };
}
