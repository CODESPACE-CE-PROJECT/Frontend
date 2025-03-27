
import { Button } from '@/components/LexicalEditor/ui/Button';
import { cn } from '@/components/LexicalEditor/Plugins/utils';
import * as React from 'react';
import {
     ReactNode,
     useCallback,
     useEffect,
     useMemo,
     useRef,
     useState,
} from 'react';
import { createPortal } from 'react-dom';

type DropDownContextType = {
     registerItem: (ref: React.RefObject<HTMLButtonElement>) => void;
};

const DropDownContext = React.createContext<DropDownContextType | null>(null);

const dropDownPadding = 4;

export function DropDownItem({
     children,
     className,
     onClick,
     title,
}: {
     children: React.ReactNode;
     className?: string;
     onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
     title?: string;
}) {
     const ref = useRef<HTMLButtonElement>(null);

     const dropDownContext = React.useContext(DropDownContext);

     if (dropDownContext === null) {
          throw new Error('DropDownItem must be used within a DropDown');
     }

     const { registerItem } = dropDownContext;

     useEffect(() => {
          if (ref && ref.current) {
               registerItem(ref);
          }
     }, [ref, registerItem]);


     return (

          <Button
               className={
                    cn(
                         `flex w-full flex-row items-center gap-x-3 justify-start py-2 px-4 hover:bg-primary hover:bg-opacity-25`, className
                    )
               }
               onClick={onClick}
               ref={ref}
               title={title}
               type="button"
          >
               {children}
          </Button>

     );
}

function DropDownItems({
     children,
     dropDownRef,
}: {
     children: React.ReactNode;
     dropDownRef: React.Ref<HTMLDivElement>;
     onClose: () => void;
}) {
     const [items, setItems] = useState<React.RefObject<HTMLButtonElement>[]>();
     const [highlightedItem, setHighlightedItem] =
          useState<React.RefObject<HTMLButtonElement>>();

     const registerItem = useCallback(
          (itemRef: React.RefObject<HTMLButtonElement>) => {
               setItems((prev) => (prev ? [...prev, itemRef] : [itemRef]));
          },
          [setItems],
     );

     const contextValue = useMemo(
          () => ({
               registerItem,
          }),
          [registerItem],
     );

     useEffect(() => {
          if (items && !highlightedItem) {
               setHighlightedItem(items[0]);
          }

          if (highlightedItem && highlightedItem.current) {
               highlightedItem.current.focus();
          }
     }, [items, highlightedItem]);

     return (
          <DropDownContext.Provider value={contextValue}>
               <div className={
                    ` fixed flex flex-col items-start z-[70] bg-hover-navbar transition-all text-popover-foreground  rounded-md border bg-popover shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 `
               } ref={dropDownRef}>
                    {children}
               </div>
          </DropDownContext.Provider>
     );
}

export default function DropDown({
     disabled = false,
     buttonLabel,
     buttonAriaLabel,
     buttonClassName,
     buttonIconClassName,
     children,
     stopCloseOnClickSelf,
     LabeClassName
}: {
     disabled?: boolean;
     buttonAriaLabel?: string;
     buttonClassName: string;
     buttonIconClassName?: React.ReactNode;
     buttonLabel?: string;
     children: ReactNode;
     stopCloseOnClickSelf?: boolean;
     LabeClassName?: string
}): JSX.Element {
     const dropDownRef = useRef<HTMLDivElement>(null);
     const buttonRef = useRef<HTMLButtonElement>(null);
     const [showDropDown, setShowDropDown] = useState(false);

     const handleClose = () => {
          setShowDropDown(false);
          if (buttonRef && buttonRef.current) {
               buttonRef.current.focus();
          }
     };

     useEffect(() => {
          const button = buttonRef.current;
          const dropDown = dropDownRef.current;

          if (showDropDown && button !== null && dropDown !== null) {
               const { top, left } = button.getBoundingClientRect();
               dropDown.style.top = `${top + button.offsetHeight + dropDownPadding}px`;
               dropDown.style.left = `${Math.min(
                    left,
                    window.innerWidth - dropDown.offsetWidth - 20,
               )}px`;
          }
     }, [dropDownRef, buttonRef, showDropDown]);

     useEffect(() => {
          const button = buttonRef.current;

          if (button !== null && showDropDown) {
               const handle = (event: MouseEvent) => {
                    const target = event.target;
                    if (stopCloseOnClickSelf) {
                         if (
                              dropDownRef.current &&
                              dropDownRef.current.contains(target as Node)
                         ) {
                              return;
                         }
                    }
                    if (!button.contains(target as Node)) {
                         setShowDropDown(false);
                    }
               };
               document.addEventListener('click', handle);

               return () => {
                    document.removeEventListener('click', handle);
               };
          }
     }, [dropDownRef, buttonRef, showDropDown, stopCloseOnClickSelf]);

     useEffect(() => {
          const handleButtonPositionUpdate = () => {
               if (showDropDown) {
                    const button = buttonRef.current;
                    const dropDown = dropDownRef.current;
                    if (button !== null && dropDown !== null) {
                         const { top } = button.getBoundingClientRect();
                         const newPosition = top + button.offsetHeight + dropDownPadding;
                         if (newPosition !== dropDown.getBoundingClientRect().top) {
                              dropDown.style.top = `${newPosition}px`;
                         }
                    }
               }
          };

          document.addEventListener('scroll', handleButtonPositionUpdate);

          return () => {
               document.removeEventListener('scroll', handleButtonPositionUpdate);
          };
     }, [buttonRef, dropDownRef, showDropDown]);

     return (
          <>

               <Button
                    typeof='button'
                    type="button"
                    onClick={() => setShowDropDown(!showDropDown)}
                    disabled={disabled}
                    aria-label={buttonAriaLabel || buttonLabel}
                    className={buttonClassName}
                    ref={buttonRef}
               >
                    {buttonIconClassName && <>{buttonIconClassName}</>}
                    {buttonLabel && (
                         <span className={LabeClassName}>{buttonLabel}</span>
                    )}
               </Button>

               {showDropDown &&
                    createPortal(
                         <DropDownItems dropDownRef={dropDownRef} onClose={handleClose}>
                              {children}
                         </DropDownItems>,
                         document.body,
                    )}
          </>
     );
}