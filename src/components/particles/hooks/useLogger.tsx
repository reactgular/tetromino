import {useMemo} from 'react';

/**
 * Prevents React.DOM from replacing methods inside hooks.
 */
const ref: Record<string, unknown> = {
    log: console.log,
    error: console.error,
    debug: console.debug
};

export const logger = (prefix: string, name: string = 'log') => {
    const func = ref[name] || (console as any)[name];
    return func.bind(console, `${prefix}:`);
};

export const loggerDebug = (prefix: string) => logger(prefix, 'debug');

export const loggerError = (prefix: string) => logger(prefix, 'error');

export const useLogger = (prefix: string, name: string = 'log') => {
    return useMemo(() => logger(prefix, name), [prefix, name]);
};

export const useDebugger = (prefix: string) => {
    return useMemo(() => loggerDebug(prefix), [prefix]);
};

export const useError = (prefix: string) => {
    return useMemo(() => loggerError(prefix), [prefix]);
};
