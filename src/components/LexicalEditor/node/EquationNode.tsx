import type {
     DOMConversionMap,
     DOMConversionOutput,
     DOMExportOutput,
     EditorConfig,
     LexicalNode,
     NodeKey,
     SerializedLexicalNode,
     Spread,
} from 'lexical'

import type { JSX } from 'react'
import katex from 'katex'
import { $applyNodeReplacement, DecoratorNode } from 'lexical'
import { Suspense } from 'react'
import KatexRenderer from '@/components/LexicalEditor/ui/KatexRenderer'

export type SerializedEquationNode = Spread<
     {
          equation: string;
          inline: boolean;
     },
     SerializedLexicalNode
>;


function $convertEquationElement(
     domNode: HTMLElement,
): null | DOMConversionOutput {
     let equation = domNode.getAttribute('data-lexical-equation');
     const inline = domNode.getAttribute('data-lexical-inline') === 'true';
     equation = atob(equation || '');
     if (equation) {
          const node = $createEquationNode(equation, inline);
          return { node };
     }

     return null;
}

export class EquationNode extends DecoratorNode<JSX.Element> {
     __equation: string;
     __inline: boolean;

     static getType(): string {
          return 'equation';
     }

     static clone(node: EquationNode): EquationNode {
          return new EquationNode(node.__equation, node.__inline, node.__key);
     }

     constructor(equation: string, inline?: boolean, key?: NodeKey) {
          super(key);
          this.__equation = equation;
          this.__inline = inline ?? false;
     }

     static importJSON(serializedNode: SerializedEquationNode): EquationNode {
          const node = $createEquationNode(
               serializedNode.equation,
               serializedNode.inline,
          ).updateFromJSON(serializedNode);
          node.markDirty();
          return node;
     }

     exportJSON(): SerializedEquationNode {
          return {
               ...super.exportJSON(),
               equation: this.getEquation(),
               inline: this.__inline,
          };
     }

     createDOM(_config: EditorConfig): HTMLElement {
          const element = document.createElement(this.__inline ? 'span' : 'div');
          element.className = 'editor-equation';
          return element;
     }

     exportDOM(): DOMExportOutput {
          const element = document.createElement(this.__inline ? 'span' : 'div');
          const equation = btoa(this.__equation);
          element.setAttribute('data-lexical-equation', equation);
          element.setAttribute('data-lexical-inline', `${this.__inline}`);
          katex.render(this.__equation, element, {
               displayMode: !this.__inline,
               errorColor: '#cc0000',
               output: 'html',
               strict: 'warn',
               throwOnError: false,
               trust: false,
          });
          return { element };
     }

     static importDOM(): DOMConversionMap | null {
          return {
               div: (domNode: HTMLElement) => {
                    if (!domNode.hasAttribute('data-lexical-equation')) {
                         return null;
                    }
                    return {
                         conversion: $convertEquationElement,
                         priority: 2,
                    };
               },
               span: (domNode: HTMLElement) => {
                    if (!domNode.hasAttribute('data-lexical-equation')) {
                         return null;
                    }
                    return {
                         conversion: $convertEquationElement,
                         priority: 1,
                    };
               },
          };
     }

     updateDOM(prevNode: this): boolean {
          return this.__inline !== prevNode.__inline;
     }

     getTextContent(): string {
          return this.__equation;
     }

     getEquation(): string {
          return this.__equation;
     }

     setEquation(equation: string): void {
          const writable = this.getWritable();
          writable.__equation = equation;
          writable.markDirty();
     }

     decorate(): JSX.Element {
          return (
               <Suspense fallback={null}>
                    <KatexRenderer 
                         equation={this.__equation}
                         inline={this.__inline}
                         key={this.__key}
                    />
               </Suspense>
          )
     }

}

export function $createEquationNode(
     equation = '',
     inline = false,
): EquationNode {
     const equationNode = new EquationNode(equation, inline);
     return $applyNodeReplacement(equationNode);
}

export function $isEquationNode(
     node: LexicalNode | null | undefined,
): node is EquationNode {
     return node instanceof EquationNode;
}