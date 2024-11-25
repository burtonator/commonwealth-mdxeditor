import { ElementNode } from 'lexical';
import * as Mdast from 'mdast';
import {Descriptors, MdastImportVisitor} from "@/importMarkdownToLexical";
import {
  $createMentionNode,
  parseHandleFromMention,
  parseIdFromPath
} from "@/plugins/mention/MentionNode";

const USE_ELEMENT_NODE_STRATEGY = true;

export const MentionMdastImportVisitor: MdastImportVisitor<Mdast.Link> = {
  testNode: (mdastNode: Mdast.Nodes, options: Descriptors): boolean => {

    if (mdastNode.type !== 'link') return false;

    if (mdastNode.children.length !== 1) {
      return false;
    }

    const firstChild = mdastNode.children[0];

    if (firstChild.type !== 'text') {
      throw new Error('First child is not text');
    }

    const value = firstChild.value;

    return !!value && value.startsWith('@');
  },
  visitNode({ mdastNode, actions, mdastParent, lexicalParent }) {

    const uid = parseIdFromPath(mdastNode.url) ?? '';

    if (mdastNode.children.length !== 1) {
      throw new Error('Expected only one child node');
    }

    const firstChild = mdastNode.children[0];

    if (firstChild.type !== 'text') {
      throw new Error('Expected text node');
    }

    const handle = parseHandleFromMention(firstChild.value);

    if (!handle) {
      throw new Error('Could not parse handle from mention');
    }

    const mentionNode = $createMentionNode(handle, uid);

    function isParent(node: unknown): node is Mdast.Parent {
      return (node as { children?: any[] }).children instanceof Array;
    }

    if (USE_ELEMENT_NODE_STRATEGY) {
      actions.addAndStepInto(mentionNode);
    } else {
      (lexicalParent as ElementNode).append(mentionNode);

      if (isParent(mdastNode)) {
        actions.visitChildren(mdastNode, lexicalParent);
      }
    }
  },
};
