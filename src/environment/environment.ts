const endsInSlash = (str: string): string => str.endsWith('/') ? str : `${str}/`;

export interface Environment {
    analytics: string;

    base: string;

    brandName: string;

    github: string;

    storageKey: string;

    version: string;
}

export const environment: Environment = {
    analytics: process.env.NEXT_PUBLIC_ANALYTICS as string,
    brandName: process.env.NEXT_PUBLIC_BRAND_NAME as string,
    github: process.env.NEXT_PUBLIC_GITHUB as string,
    storageKey: process.env.NEXT_PUBLIC_STORAGE_KEY as string,
    version: process.env.NEXT_PUBLIC_VERSION as string,
    base: endsInSlash(process.env.NEXT_PUBLIC_BASE as string ?? '/')
};
