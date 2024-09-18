import { nextAnimationFrame, tick } from './services/tick.js';
import { Timeline } from './components/timeline.js';
import { renderers } from './services/animator.js';
import { renderSubtimeline } from './renderers/renderSubtimeline.js';
// Register timeline renderers.
renderers.push(renderSubtimeline);
// Export out globals.
export { nextAnimationFrame, Timeline, tick };
//# sourceMappingURL=lite.js.map