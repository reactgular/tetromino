export interface Environment {
    analytics: string;

    base: string;

    brandName: string;

    github: string;

    storageKey: string;

    version: string;
}

export const environment: Environment = {
    analytics: process.env.REACT_APP_ANALYTICS as string,
    brandName: process.env.REACT_APP_BRAND_NAME as string,
    github: process.env.REACT_APP_GITHUB as string,
    storageKey: process.env.REACT_APP_STORAGE_KEY as string,
    version: process.env.REACT_APP_VERSION as string,
    base: process.env.REACT_APP_BASE as string
};
