/**
 * "document_id" -> "document id"
 * "documentId" -> "document id"
 */
export const toSpaces = (str: string): string =>
    str && str.replace(/[-_]/g, ' ').replace(/([A-Z])/g, ' $1');
