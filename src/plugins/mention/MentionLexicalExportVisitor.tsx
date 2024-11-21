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
    console.log(
      'FIXME: MentionLexicalExportVisitor.visitLexicalNode: ' +
        lexicalNode.__handle,
    );

    // NOTE: that this MUST be type 'link' because this is an mdast node type
    // FIXME: this works BUT I need to figure out how to set the text of the link and the node...
    actions.addAndStepInto('link', {
      url: lexicalNode.__url,
      // FIXME: ok... I don't think this is actually working because children
      // doesn't seem to be required on the initial loading anyway.
      // children: [{ type: 'text', value: '@' + lexicalNode.__handle }],
    });
  },
};
