export interface Environment {
    brandName: string;

    github: string;

    storageKey: string;

    version: string;
}

export const environment: Environment = {
    brandName: 'Tetromino',
    github: 'https://github.com/reactgular/tetromino',
    storageKey: 'tetromino',
    version: '1.0.0'
};
