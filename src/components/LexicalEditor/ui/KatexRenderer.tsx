/* eslint-disable @next/next/no-img-element */
import type { JSX } from 'react';

import katex from 'katex';
import * as React from 'react';
import { useEffect, useRef } from 'react';

export default function KatexRenderer({
     equation,
     inline,
}: Readonly<{
     equation: string;
     inline: boolean;
}>): JSX.Element {
     const katexElementRef = useRef(null);

     useEffect(() => {
          const katexElement = katexElementRef.current;

          if (katexElement !== null) {
               katex.render(equation, katexElement, {
                    displayMode: !inline,
                    errorColor: '#cc0000',
                    output: 'html',
                    strict: 'warn',
                    throwOnError: false,
                    trust: false,
               });
          }
     }, [equation, inline]);

     return (
          <>
               <img src="#" alt="" />
               <span
                    tabIndex={-1}
                    ref={katexElementRef}
               />
               <img src="#" alt="" />
          </>
     );
}