import type {EditorThemeClasses} from 'lexical';
import "@/components/LexicalEditor/theme.css"

export const theme:EditorThemeClasses = {
     heading: {
          h1: 'editor-heading-h1',
          h2: 'editor-heading-h2',
          h3: 'editor-heading-h3',
          h4: 'editor-heading-h4',
          h5: 'editor-heading-h5',
     },
     image: 'editor-image',
     link: 'editor-link',
     list: {
          checklist: 'editor-checklist', 
          listitem: 'editor-listitem',
          nested: {
               listitem: 'editor-nested-listitem',
          },
          ol: 'editor-list-ol',
          ul: 'editor-list-ul',
     },
     ltr: 'ltr',
     paragraph: 'editor-paragraph',
     placeholder: 'editor-placeholder',
     quote: 'editor-quote',
     rtl: 'rtl',
     text: {
          bold: 'editor-text-bold',
          code: 'editor-text-code',
          hashtag: 'editor-text-hashtag',
          italic: 'editor-text-italic',
          overflowed: 'editor-text-overflowed',
          strikethrough: 'editor-text-strikethrough',
          underline: 'editor-text-underline',
          underlineStrikethrough: 'editor-text-underlineStrikethrough',
     },
     code: 'editor-code',
     codeHighlight: {
          atrule: "editorTokenAttr",
          attr: "editorTokenAttr",
          boolean: "editorTokenProperty",
          builtin: "editorTokenSelector",
          cdata: "editorTokenComment",
          char: "editorTokenSelector",
          class: "editorTokenFunction", // class constructor
          comment: "editorTokenComment", // comment
          constant: "editorTokenProperty",
          deleted: "editorTokenProperty",
          doctype: "editorTokenComment",
          entity: "editorTokenOperator",
          function: "editorTokenFunction", // es5 function
          important: "editorTokenVariable",
          inserted: "editorTokenSelector",
          keyword: "editorTokenAttr", // variable keyword like const/let
          namespace: "editorTokenVariable",
          number: "editorTokenProperty", // number values
          operator: "editorTokenOperator", // operator like +/*-
          prolog: "editorTokenComment",
          property: "editorTokenProperty",
          punctuation: "editorTokenPunctuation", // brackets of array, object
          regex: "editorTokenVariable",
          selector: "editorTokenSelector",
          string: "editorTokenSelector", // string values
          symbol: "editorTokenProperty",
          tag: "editorTokenProperty",
          url: "editorTokenOperator",
          variable: "editorTokenVariable",
     },
} 