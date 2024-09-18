import { back } from './eases/back.js';
import { bounce } from './eases/bounce.js';
import { cubicBezier } from './eases/cubicBezier.js';
import { yoyo } from './eases/yoyo.js';
import { repeat } from './eases/repeat.js';
import { getEase, eases } from './eases/eases.js';
import { nextAnimationFrame, tick } from './services/tick.js';
import { power } from './eases/power.js';
import { sine } from './eases/sine.js';
import { steps } from './eases/steps.js';
import { Timeline } from './components/timeline.js';
import { elastic } from './eases/elastic.js';
import { renderers } from './services/animator.js';
import { renderTween } from './renderers/renderTween.js';
import { renderSubtimeline } from './renderers/renderSubtimeline.js';
// Register second half of Timeline
import './components/timeline.animate';
// Register built-in easings
// Linear is the fallback when an easing isn't found, so we won't register it.
eases.back = back;
eases.bounce = bounce;
eases['cubic-bezier'] = cubicBezier;
eases.elastic = elastic;
eases.power = power;
eases.repeat = repeat;
eases.sine = sine;
eases.steps = steps;
eases.yoyo = yoyo;
// Register timeline renderers.
renderers.push(renderSubtimeline);
renderers.push(renderTween);
/**
 * Convenience method for doing animations.
 */
function animate(targets, duration, props) {
    return new Timeline().animate(targets, duration, props);
}
// Export out globals.
export const just = {
    animate,
    eases,
    getEase,
    nextAnimationFrame,
    Timeline,
    tick,
};
//# sourceMappingURL=index.js.map