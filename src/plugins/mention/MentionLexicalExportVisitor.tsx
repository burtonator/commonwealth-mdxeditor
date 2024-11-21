import * as Mdast from 'mdast';
import {LexicalExportVisitor} from "@/exportMarkdownFromLexical";
import {$isMentionNode, MentionNode} from "@/plugins/mention/MentionNode";

export const MentionLexicalExportVisitor: LexicalExportVisitor<
  MentionNode,
  Mdast.Link
> = {
  testLexicalNode: $isMentionNode,

  // FIXME: for some reasont his is being called too!
  visitLexicalNode: ({ lexicalNode, actions }) => {

    // NOTE: that this MUST be type 'link' because this is an mdast node type
    actions.addAndStepInto('link', {
      url: lexicalNode.__url,
      // I think this is required to consistently have the link have the
      // @mention text, but it does not seem to work consistently.
      children: [{ type: 'text', value: '@' + lexicalNode.__handle }],
    });
  },
};
