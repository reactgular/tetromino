import {GamePieceRotations} from './game-player';

export const PIECE_O: GamePieceRotations = [
    [
        [-1, 0],
        [0, 0],
        [-1, 1],
        [0, 1]
    ]
];

export const PIECE_I: GamePieceRotations = [
    [
        [-2, 0],
        [-1, 0],
        [0, 0],
        [1, 0]
    ],
    [
        [0, -1],
        [0, 0],
        [0, 1],
        [0, 2]
    ]
];

export const PIECE_S: GamePieceRotations = [
    [
        [0, -1],
        [0, 0],
        [1, 0],
        [1, 1]
    ],
    [
        [0, 0],
        [1, 0],
        [-1, 1],
        [0, 1]
    ]
];

export const PIECE_Z: GamePieceRotations = [
    [
        [1, -1],
        [0, 0],
        [1, 0],
        [0, 1]
    ],
    [
        [-1, 0],
        [0, 0],
        [0, 1],
        [1, 1]
    ]
];

export const PIECE_L: GamePieceRotations = [
    [
        [1, -1],
        [-1, 0],
        [0, 0],
        [1, 0]
    ],
    [
        [-1, -1],
        [0, -1],
        [0, 0],
        [0, 1]
    ],
    [
        [-1, 0],
        [0, 0],
        [1, 0],
        [-1, 1]
    ],
    [
        [0, -1],
        [0, 0],
        [0, 1],
        [1, 1]
    ]
];

export const PIECE_J: GamePieceRotations = [
    [
        [-1, -1],
        [-1, 0],
        [0, 0],
        [1, 0]
    ],
    [
        [0, -1],
        [0, 0],
        [-1, 1],
        [0, 1]
    ],
    [
        [-1, 0],
        [0, 0],
        [1, 0],
        [1, 1]
    ],
    [
        [0, -1],
        [1, -1],
        [0, 0],
        [0, 1]
    ]
];

export const PIECE_T: GamePieceRotations = [
    [
        [0, -1],
        [-1, 0],
        [0, 0],
        [1, 0]
    ],
    [
        [0, -1],
        [-1, 0],
        [0, 0],
        [0, 1]
    ],
    [
        [-1, 0],
        [0, 0],
        [1, 0],
        [0, 1]
    ],
    [
        [0, -1],
        [0, 0],
        [1, 0],
        [0, 1]
    ]
];
