import { ja } from '../types';
export declare const renderers: Array<(config: ja.TimelineConfig, operations: Array<() => void>) => void>;
/**
 * Enqueues the timeline to be updated and rendered.
 * @param configurator
 */
export declare function queueTransition<T extends ja.TimelineConfig>(configurator: T): T;
