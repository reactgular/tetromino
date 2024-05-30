export interface KeyBindings {
    hard_drop: string;

    hold: string;

    left: string;

    right: string;

    rotate_left: string;

    rotate_right: string;

    soft_drop: string;
}

export const DEFAULT_KEY_BINDINGS: KeyBindings = {
    right: 'ArrowRight',
    left: 'ArrowLeft',
    rotate_left: 'ArrowUp',
    rotate_right: 'KeyZ',
    soft_drop: 'ArrowDown',
    hard_drop: 'Space',
    hold: 'KeyC'
};

export const KEY_BINDINGS: Array<keyof KeyBindings> = [
    'left',
    'right',
    'rotate_left',
    'rotate_right',
    'soft_drop',
    'hard_drop',
    'hold'
];

export const KEY_BINDING_LABELS: Record<keyof KeyBindings, string> = {
    left: 'Move Left',
    right: 'Move Right',
    rotate_left: 'Rotate Left',
    rotate_right: 'Rotate Right',
    soft_drop: 'Soft Drop',
    hard_drop: 'Hard Drop',
    hold: 'Hold'
};
