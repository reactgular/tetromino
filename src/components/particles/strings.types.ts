/**
 * "document_id" -> "document id"
 * "documentId" -> "document id"
 */
export const toSpaces = (str: string): string =>
    str && str.replace(/[-_]/g, ' ').replace(/([A-Z])/g, ' $1');

/**
 * "Hello World" -> "hello-world"
 */
export const toKebabCase = (str: string): string =>
    str &&
    str
        .match(
            /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
        )!
        .map((x) => x.toLowerCase())
        .join('-');
