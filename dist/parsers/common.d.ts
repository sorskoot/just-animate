export declare const SYNTAX_REGEX: RegExp;
export declare const PAREN_OPEN_REGEX: RegExp;
export declare const PAREN_CLOSE_REGEX: RegExp;
export declare const HEX_REGEX: RegExp;
export declare const STRING_REGEX: RegExp;
export declare const NUMBER_REGEX: RegExp;
export declare const UNIT_REGEX: RegExp;
export declare const PATH_COMMAND_REGEX: RegExp;
export interface ParserContext {
    match: string;
    pos: number;
    last: number;
    state: number;
    pattern: string;
}
/** A bitflag token for a number. */
export declare const NUMBER = 1;
/** A bitflag token for expression delimiter. */
export declare const SYNTAX = 2;
/** A bitflag token for a keyword. */
export declare const STRING = 4;
/** A bitflag token for a unit. */
export declare const UNIT: number;
/** A bitflag token for a ( */
export declare const PAREN_OPEN: number;
/** A bitflag token for a ) which is also considered delimiter. */
export declare const PAREN_CLOSE: number;
/** A bitflag token for a function, which is composed of a keyword and a (. */
export declare const FUNCTION = 32;
export declare function clearContext(ctx: ParserContext, value: string): void;
export declare function match(ctx: ParserContext, regex: RegExp): boolean;
