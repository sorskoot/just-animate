type CacheableFn<T> = (str: string) => T;
export declare function cachefn<T>(fn: CacheableFn<T>): CacheableFn<T>;
export {};
