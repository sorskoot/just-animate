declare var jQuery;

import {extend, isArray, isFunction, each, multiapply} from './helpers';
import {IAnimation, IAnimationTiming, IElementProvider, IKeyframe, IKeyframeGroupDict, jQuery as JQueryType} from './interfaces';
import {AnimationRelay} from './AnimationRelay';

function flattenElements(source: Element|Element[]|JQueryType|IElementProvider) : Element[] {
    if (source instanceof Element) {
        return [source];
    }
    if (isArray(source) || source instanceof jQuery) {
        var elements = [];
        each(source as any[], i => {
            elements.push.apply(elements, flattenElements(i));
        });
        return elements;
    }
    if (isFunction(source)) {
        var provider = source as IElementProvider;
        var result = provider();
        return flattenElements(result);
    }
    return [];
}

export class AnimationManager {
    private _definitions: IKeyframeGroupDict;
    private _timings: IAnimationTiming;

    constructor() {
        this._definitions = {};
        this._timings = {
            "duration": 1000,
            "fill": "both"
        };
    }
    
    animate(name: string, el: Element|Element[]|JQueryType|IElementProvider, timings?: IAnimationTiming): IAnimation {
        if (typeof name === 'undefined') {
            return;
        }

        var definition = this._definitions[name];
        if (typeof definition === 'undefined') {
            return;
        }

        var timings2 = extend({}, definition.timings);
        if (timings) {
            timings2 = extend(timings2, timings);
        }

        var keyframes = definition.keyframes;
        var elements = flattenElements(el);
        var players = multiapply(elements, 'animate', [ keyframes, timings2]) as IAnimation[];
        
        return new AnimationRelay(players);
        
    }
    configure(timings?: IAnimationTiming) {
        extend(this._timings, timings);
    }
    register(name: string, keyframes: IKeyframe[], timings?: IAnimationTiming) {
        var definition = {
            keyframes: keyframes,
            timings: timings
        };
        this._definitions[name] = definition;

        var self = this;
        this[name] = function(el, timings) {
            return self.animate(name, el, timings);
        };
        return this;
    }
}