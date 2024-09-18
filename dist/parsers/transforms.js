import { match, SYNTAX, NUMBER, UNIT, FUNCTION, } from './common.js';
import { NUMBER_REGEX, SYNTAX_REGEX, UNIT_REGEX, STRING_REGEX, } from './common.js';
export function nextToken(ctx) {
    if (match(ctx, SYNTAX_REGEX)) {
        return SYNTAX;
    }
    if (match(ctx, NUMBER_REGEX)) {
        return NUMBER;
    }
    if (match(ctx, UNIT_REGEX)) {
        return UNIT;
    }
    if (match(ctx, STRING_REGEX)) {
        return FUNCTION;
    }
}
//# sourceMappingURL=transforms.js.map