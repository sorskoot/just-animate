import { Timeline } from './timeline.js';
import { ja } from '../_types.js';
/**
 * Configure a tween from the (current) position for the duration specified.
 * @param targets The element, object, or selector to animate.
 * @param duration The duration in milliseconds of the tween.
 * @param props The end state properties of the tween.
 * if not specified.
 * @public
 */
declare function animate<T>(this: Timeline, targets: T | string, duration: number, props: Partial<ja.KeyframeProps>): Timeline;
/**
 * Adds a delay at the current position.
 * @param duration the amount to delay.
 * @public
 */
declare function delay(this: Timeline, duration: number): Timeline;
/**
 * Sets the properties at a given time. This is a convenience method for
 * calling animate with an ease of steps(1, end).
 * @public
 */
declare function set<T>(this: Timeline, targets: T | string, props: ja.KeyframeProps): Timeline;
/**
 * Creates a target alias that can be referred to in the targets parameter in
 * animate() and set().  It is recommended to prefix the alias with @ to
 * prevent conflicts with CSS selectors. This is useful for creating generic
 * animations where the target is not known when defining the tweens.
 * @param alias
 * @param target
 * @public
 */
declare function target(this: Timeline, alias: string, target: ja.AnimationTarget): Timeline;
declare module './timeline.js' {
    interface Timeline {
        animate: typeof animate;
        delay: typeof delay;
        set: typeof set;
        target: typeof target;
        targetIds: number;
        targets: Record<string, ja.AnimationTarget>;
    }
}
export {};
