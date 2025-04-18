import { $isAtNodeEnd} from '@lexical/selection';
import {
     ElementNode,
     RangeSelection,
     TextNode,
} from 'lexical';
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function getSelectedNode(
     selection: RangeSelection,
): TextNode | ElementNode {
     const anchor = selection.anchor;
     const focus = selection.focus;
     const anchorNode = selection.anchor.getNode();
     const focusNode = selection.focus.getNode();
     if (anchorNode === focusNode) {
          return anchorNode;
     }
     const isBackward = selection.isBackward();
     if (isBackward) {
          return $isAtNodeEnd(focus) ? anchorNode : focusNode;
     } else {
          return $isAtNodeEnd(anchor) ? anchorNode : focusNode;
     }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}