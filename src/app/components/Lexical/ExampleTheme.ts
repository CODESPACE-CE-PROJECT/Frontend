/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export default {
    code: 'editor-code bg-gray-100 p-1 text-sm font-mono', // Background for code, padding, small font, monospace
    heading: {
      h1: 'text-2xl text-gray-800 font-normal mb-3', // Heading 1 styles
      h2: 'text-xl text-gray-700 font-bold mt-2 mb-3', // Heading 2 styles
      h3: 'text-lg text-gray-600 font-bold mt-2 mb-3', // Heading 3 styles
      h4: 'text-base text-gray-500 font-bold mt-2 mb-3', // Heading 4 styles
      h5: 'text-sm text-gray-400 font-bold mt-2 mb-3', // Heading 5 styles
    },
    image: 'editor-image', // Assuming custom styles for images remain the same
    link: 'text-blue-600 underline', // Styles for links
    list: {
      listitem: 'list-disc pl-5', // Styles for list items
      nested: {
        listitem: 'list-disc pl-5', // Nested list items
      },
      ol: 'list-decimal pl-5', // Ordered list
      ul: 'list-disc pl-5', // Unordered list
    },
    ltr: 'text-left', // Left-to-right text alignment
    paragraph: 'mb-2', // Styles for paragraphs
    placeholder: 'text-gray-400', // Styles for placeholders
    quote: 'border-l-4 border-gray-300 pl-4 italic text-gray-600', // Quote styles
    rtl: 'text-right', // Right-to-left text alignment
    text: {
      bold: 'font-bold', // Bold text
      code: 'bg-gray-100 p-1 text-sm font-mono', // Code text styling
      hashtag: 'text-blue-600', // Hashtag styles
      italic: 'italic', // Italic text
      overflowed: 'overflow-hidden', // Overflow styles
      strikethrough: 'line-through', // Strikethrough text
      underline: 'underline', // Underline text
      underlineStrikethrough: 'line-through underline', // Underline and strikethrough
    },
  };
  