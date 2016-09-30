import {isDefined, isFunction, isNumber, isString, isArray} from '../../common/type';
import {toCamelCase} from '../../common/strings';
import {invalidArg} from '../../common/errors';
import {easings} from '../../common/easings';
import {each, head, tail} from '../../common/lists';
import {listProps, unwrap} from '../../common/objects';
import {KeyframeAnimator} from '../waapi/KeyframeAnimator';
import {resolveTimeExpression} from '../../common/units';

import {
    animate,
    easingString,
    nada,
    nil,
    offsetString,
    scale3d,
    scale,
    scaleX,
    scaleY,
    scaleZ,
    skew,
    skewX,
    skewY,
    rotate3d,
    rotate,
    rotateX,
    rotateY,
    rotateZ,
    translate,
    translate3d,
    x,
    y,
    z,
    translateY,
    translateX,
    translateZ,
    transform
} from '../../common/resources';

const global = window;

const propertyAliases = {
    x: translateX,
    y: translateY,
    Z: translateZ
}

const transforms = [
    'perspective',
    'matrix',
    translate,
    translate3d,
    translateX,
    translateY,    
    translateZ,
    x,
    y,
    z,
    skew,
    skewX,
    skewY,
    scale,    
    scale3d,
    scaleX,
    scaleY,
    scaleZ,
    rotate,
    rotate3d,    
    rotateX,
    rotateY,
    rotateZ
];

export function createAnimator(ctx: ja.CreateAnimationContext<HTMLElement>): ja.IAnimationController {
    const options = ctx.options;
    const delay = resolveTimeExpression(unwrap(options.delay, ctx) || 0, ctx.index);
    const endDelay = resolveTimeExpression(unwrap(options.endDelay, ctx) || 0, ctx.index);
    const iterations = unwrap(options.iterations, ctx) || 1;
    const iterationStart = unwrap(options.iterationStart, ctx) || 0;
    const direction = unwrap(options.direction, ctx) || nil;
    const duration = options.to - options.from;
    const fill = unwrap(options.fill, ctx) || 'none';
    const totalTime = delay + ((iterations || 1) * duration) + endDelay;

    // note: don't unwrap easings so we don't break this later with custom easings
    const easing = options.easing || 'linear';

    const timings = {
        delay,
        endDelay,
        duration,
        iterations,
        iterationStart,
        fill,
        direction,
        easing
    };

    const animator = new KeyframeAnimator(initAnimator.bind(nada, timings, ctx));
    animator.totalDuration = totalTime;
    
    if (isFunction(options.update)) {
        animator.onupdate = options.update;
    }

    return animator;
}

function initAnimator(timings: waapi.IEffectTiming, ctx: ja.CreateAnimationContext<HTMLElement>): waapi.IAnimation {
    // process css as either keyframes or calculate what those keyframes should be   
    const options = ctx.options;
    const target = ctx.target;
    const css = options.css;

    let sourceKeyframes: ja.ICssKeyframeOptions[];
    if (isArray(css)) {
        // if an array, no processing has to occur
        sourceKeyframes = css as ja.ICssKeyframeOptions[];
        expandOffsets(sourceKeyframes);
    } else {
        sourceKeyframes = [];
        propsToKeyframes(css as ja.ICssPropertyOptions, sourceKeyframes, ctx);
    }

    const targetKeyframes: waapi.IKeyframe[] = [];
    
    unwrapPropertiesInKeyframes(sourceKeyframes, targetKeyframes, ctx);
    spaceKeyframes(targetKeyframes);
    
    if (options.isTransition === true) {
        addTransition(targetKeyframes, target);
    } else {
        fixPartialKeyframes(targetKeyframes);
    }

    const animator = target[animate](targetKeyframes, timings);
    animator.cancel();
    return animator;
}


function addTransition(keyframes: waapi.IKeyframe[], target: HTMLElement): void {
    // detect properties to transition
    const properties = listProps(keyframes);

    // get or create the first frame
    let firstFrame = head(keyframes, (t: ja.ICssKeyframeOptions) => t.offset === 0) as waapi.IKeyframe;
    if (!firstFrame) {
        firstFrame = { offset: 0 };
        keyframes.splice(0, 0, firstFrame);
    }

    // copy properties from the dom to the animation
    // todo: check how to do this in IE8, or not?
    const style = global.getComputedStyle(target);

    each(properties, (property: string) => {
        // skip offset property
        if (property === offsetString) {
            return;
        }
    
        const alias = transforms.indexOf(property) !== -1 ? transform : property;
        const val = style[alias];
        if (isDefined(val)) {
            firstFrame[alias] = val;
        }
    });
}

/**
 * copies keyframs with an offset array to separate keyframes
 * 
 * @export
 * @param {waapi.IKeyframe[]} keyframes
 */
function expandOffsets(keyframes: ja.ICssKeyframeOptions[]): void {
    const len = keyframes.length;
    for (let i = len - 1; i > -1; --i) {
        const keyframe = keyframes[i];

        if (isArray(keyframe.offset)) {
            keyframes.splice(i, 1);            
            
            const offsets = keyframe.offset as number[];
            const offsetLen = offsets.length;
            for (let j = offsetLen - 1; j > -1; --j) {
                const offsetAmount = offsets[j];
                const newKeyframe: ja.ICssKeyframeOptions = {};
                for (let prop in keyframe) {
                    if (prop !== offsetString) {
                        newKeyframe[prop] = keyframe[prop];
                    }
                }
                newKeyframe.offset = offsetAmount;
                keyframes.splice(i, 0, newKeyframe);                
            }
        }
    }
}


function unwrapPropertiesInKeyframes(source: ja.ICssKeyframeOptions[], target: ja.ICssKeyframeOptions[], ctx: ja.CreateAnimationContext<HTMLElement>): void {
    const len = source.length;
    for (let i = 0; i < len; i++) {
        const sourceKeyframe = source[i];
        let targetKeyframe: waapi.IKeyframe = {};

        for (let propertyName in sourceKeyframe) {
            if (!sourceKeyframe.hasOwnProperty(propertyName)) {
                continue;
            }
            const sourceValue = sourceKeyframe[propertyName];
            if (!isDefined(sourceValue)) {
                continue;
            }
            targetKeyframe[propertyName] = unwrap(sourceValue, ctx);
        }
            
        normalizeProperties(targetKeyframe);
        target.push(targetKeyframe);
    }
}

function propsToKeyframes(css: ja.ICssPropertyOptions, keyframes: ja.ICssKeyframeOptions[], ctx: ja.CreateAnimationContext<HTMLElement>): void {
    // create a map to capture each keyframe by offset
    const keyframesByOffset: { [key: number]: ja.ICssKeyframeOptions } = {};
    const cssProps = css as ja.ICssPropertyOptions;

    // iterate over each property split it into keyframes            
    for (let prop in cssProps) {
        if (!cssProps.hasOwnProperty(prop)) {
            continue;
        }

        // unwrap value (changes function into discrete value or array)                    
        const val = unwrap(cssProps[prop], ctx);

        if (isArray(val)) {
            // if the value is an array, split up the offset automatically
            const valAsArray = val as string[];
            const valLength = valAsArray.length;

            for (let i = 0; i < valLength; i++) {
                const offset = i === 0 ? 0 : i === valLength - 1 ? 1 : i / (valLength - 1.0);
                let keyframe = keyframesByOffset[offset];
                if (!keyframe) {
                    keyframe = {};
                    keyframesByOffset[offset] = keyframe;
                }
                keyframe[prop] = val[i];
            }
        } else {
            // if the value is not an array, place it at offset 1
            let keyframe = keyframesByOffset[1];
            if (!keyframe) {
                keyframe = {};
                keyframesByOffset[1] = keyframe;
            }
            keyframe[prop] = val;
        }
    }

    for (let offset in keyframesByOffset) {
        const keyframe = keyframesByOffset[offset];
        keyframe.offset = Number(offset);
        keyframes.push(keyframe);
    }
}


function spaceKeyframes(keyframes: waapi.IKeyframe[]): void {
    // don't attempt to fill animation if less than 2 keyframes
    if (keyframes.length < 2) {
        return;
    }

    const first = keyframes[0];
    // ensure first offset    
    if (first.offset !== 0) {
        first.offset = 0;
    }

    const last = keyframes[keyframes.length - 1];
    // ensure last offset
    if (last.offset !== 1) {
        last.offset = 1;
    }

    // explicitly set implicit offsets
    const len = keyframes.length;
    const lasti = len - 1;
    for (let i = 1; i < lasti; i++) {
        const target = keyframes[i];

        // skip entries that have an offset        
        if (isNumber(target.offset)) {
            continue;
        }

        // search for the next offset with a value        
        for (let j = i + 1; j < len; j++) {
            // pass if offset is not set
            if (!isNumber(keyframes[j].offset)) {
                continue;
            }

            // calculate timing/position info
            const startTime = keyframes[i - 1].offset as number;
            const endTime = keyframes[j].offset as number;
            const timeDelta = endTime - startTime;
            const deltaLength = j - i + 1;

            // set the values of all keyframes between i and j (exclusive)
            for (let k = 1; k < deltaLength; k++) {
                // set to percentage of change over time delta + starting time
                keyframes[k - 1 + i].offset = ((k / j) * timeDelta) + startTime;
            }

            // move i past this keyframe since all frames between should be processed
            i = j;
            break;
        }
    }
}

/**
 * If a property is missing at the start or end keyframe, the first or last instance of it is moved to the end.
 */
function fixPartialKeyframes(keyframes: waapi.IKeyframe[]): void {
    // don't attempt to fill animation if less than 1 keyframes
    if (keyframes.length < 1) {
        return;
    }

    let first: waapi.IKeyframe =
        head(keyframes, (k: waapi.IKeyframe) => k.offset === 0)
        || head(keyframes, (k: waapi.IKeyframe) => k.offset === nil);
    
    if (first === nil) {
        first = {};
        keyframes.splice(0, 0, first);
    }   
    if (first.offset === nil) {
        first.offset = 0;
    }
    
    let last: waapi.IKeyframe =
        tail(keyframes, (k: waapi.IKeyframe) => k.offset === 1)
        || tail(keyframes, (k: waapi.IKeyframe) => k.offset === nil);
    
    if (last === nil) {
        last = {};
        keyframes.push(last);
    }  
    if (last.offset === nil) {
        last.offset = 0;
    }

    // fill initial keyframe with missing props
    const len = keyframes.length;
    for (let i = 1; i < len; i++) {
        const keyframe = keyframes[i];
        for (let prop in keyframe) {
            if (prop !== offsetString && !isDefined(first[prop])) {
                first[prop] = keyframe[prop];
            }
        }
    }

    // fill end keyframe with missing props
    for (let i = len - 2; i > -1; i--) {
        const keyframe = keyframes[i];
        for (let prop in keyframe) {
            if (prop !== offsetString && !isDefined(last[prop])) {
                last[prop] = keyframe[prop];
            }
        }
    }

    // sort by offset (should have all offsets assigned)
    keyframes.sort(keyframeOffsetComparer);    
}

function keyframeOffsetComparer(a: waapi.IKeyframe, b: waapi.IKeyframe): number {
    return (a.offset as number) - (b.offset as number);
}

function transformPropertyComparer(a: string[], b: string[]) {
    return transforms.indexOf(a[0]) - transforms.indexOf(b[0]);
}

/**
 * Handles transforming short hand key properties into their native form
 */
function normalizeProperties(keyframe: waapi.IKeyframe): void {
    let cssTransforms: string[][] = [];

    for (let prop in keyframe) {
        const value = keyframe[prop];
        if (!isDefined(value)) {
            keyframe[prop] = nil;
            continue;
        }

        // nullify properties so shorthand and handled properties don't end up in the result
        keyframe[prop] = nil;

        // get the final property name
        const propAlias = propertyAliases[prop] || prop;

        // find out if the property needs to end up on transform
        const transformIndex = transforms.indexOf(propAlias);

        if (transformIndex !== -1) {
            // handle transforms
            cssTransforms.push([propAlias, value]);
        } else if (propAlias === easingString) {
            // handle easings
            keyframe[easingString] = easings[value] || value || nil;
        } else {
            // handle others (change background-color and the like to backgroundColor)
            keyframe[toCamelCase(propAlias)] = value;            
        }
    }

    if (cssTransforms.length) {
        keyframe[transform] = cssTransforms
            .sort(transformPropertyComparer)
            .reduce((c: string, n: string[]) => c + ` ${n[0]}(${n[1]})`, '');
    }
}
