export interface Environment {
    analytics: string;

    brandName: string;

    github: string;

    storageKey: string;
}

export const environment: Environment = {
    analytics: process.env.NEXT_PUBLIC_ANALYTICS as string,
    brandName: process.env.NEXT_PUBLIC_BRAND_NAME as string,
    github: process.env.NEXT_PUBLIC_GITHUB as string,
    storageKey: process.env.NEXT_PUBLIC_STORAGE_KEY as string
};
