import { ja } from './types';
import { nextAnimationFrame, tick } from './services/tick';
import { Timeline } from './components/timeline';
import './components/timeline.animate';
/**
 * Convenience method for doing animations.
 */
declare function animate<T>(targets: T | string, duration: number, props: Partial<ja.KeyframeProps>): Timeline;
export declare const just: {
    animate: typeof animate;
    eases: Record<string, ja.EaseFactory>;
    getEase: (str: string) => ja.Ease;
    nextAnimationFrame: typeof nextAnimationFrame;
    Timeline: typeof Timeline;
    tick: typeof tick;
};
export {};
