import { ParserContext } from './common.js';
export interface MixerParserContext extends ParserContext {
    isPath: boolean;
}
export declare function nextToken(ctx: MixerParserContext): number | undefined;
