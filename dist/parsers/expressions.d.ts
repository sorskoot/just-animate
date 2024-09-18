import { ParserContext } from "./common";
export interface MixerParserContext extends ParserContext {
    isPath: boolean;
}
export declare function nextToken(ctx: MixerParserContext): number | undefined;
