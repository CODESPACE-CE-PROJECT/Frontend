import { Button } from "@/components/LexicalEditor/ui/Button";
import "@/components/LexicalEditor/Plugins/FontSizePlugin/fontSize.css"
import { $patchStyleText } from "@lexical/selection";
import { $getSelection, LexicalEditor } from "lexical";
import { Minus, Plus } from 'lucide-react'
import { useCallback, useEffect, useState } from "react";

const MIN_ALLOWED_FONT_SIZE = 8;
const MAX_ALLOWED_FONT_SIZE = 72;
const DEFAULT_FONT_SIZE = 15;

enum updateFontSizeType {
     increment = 1,
     decrement,
}

export const FontSizePlugin = ({
     selectionFontSize,
     disabled,
     editor,
}: {
     selectionFontSize: string,
     disabled?: boolean,
     editor: LexicalEditor
}) => {
     const [inputValue, setInputValue] = useState<string>(selectionFontSize)
     const [inputChangeFlag, setInputChangeFlag] = useState<boolean>(false)

     const calculateNextFontSize = (
          currentFontSize: number,
          updateType: updateFontSizeType | null,
     ) => {
          if (!updateType) {
               return currentFontSize;
          }

          let updatedFontSize: number = currentFontSize;
          switch (updateType) {
               case updateFontSizeType.decrement:
                    switch (true) {
                         case currentFontSize > MAX_ALLOWED_FONT_SIZE:
                              updatedFontSize = MAX_ALLOWED_FONT_SIZE;
                              break;
                         case currentFontSize >= 48:
                              updatedFontSize -= 12;
                              break;
                         case currentFontSize >= 24:
                              updatedFontSize -= 4;
                              break;
                         case currentFontSize >= 14:
                              updatedFontSize -= 2;
                              break;
                         case currentFontSize >= 9:
                              updatedFontSize -= 1;
                              break;
                         default:
                              updatedFontSize = MIN_ALLOWED_FONT_SIZE;
                              break;
                    }
                    break;

               case updateFontSizeType.increment:
                    switch (true) {
                         case currentFontSize < MIN_ALLOWED_FONT_SIZE:
                              updatedFontSize = MIN_ALLOWED_FONT_SIZE;
                              break;
                         case currentFontSize < 12:
                              updatedFontSize += 1;
                              break;
                         case currentFontSize < 20:
                              updatedFontSize += 2;
                              break;
                         case currentFontSize < 36:
                              updatedFontSize += 4;
                              break;
                         case currentFontSize <= 60:
                              updatedFontSize += 12;
                              break;
                         default:
                              updatedFontSize = MAX_ALLOWED_FONT_SIZE;
                              break;
                    }
                    break;

               default:
                    break;
          }
          return updatedFontSize;
     };

     const updateFontSizeInSelection = useCallback(
          (newFontSize: string | null, updateType: updateFontSizeType | null) => {
               const getNextFontSize = (prevFontSize: string | null): string => {
                    if (!prevFontSize) {
                         prevFontSize = `${DEFAULT_FONT_SIZE}px`;
                    }
                    prevFontSize = prevFontSize.slice(0, -2);
                    const nextFontSize = calculateNextFontSize(
                         Number(prevFontSize),
                         updateType,
                    );
                    return `${nextFontSize}px`;
               };

               editor.update(() => {
                    if (editor.isEditable()) {
                         const selection = $getSelection();
                         if (selection !== null) {
                              $patchStyleText(selection, {
                                   'font-size': newFontSize || getNextFontSize,
                              });
                         }
                    }
               });
          },
          [editor],
     );

     const updateFontSizeByInputValue = (inputValueNumber: number) => {
          let updatedFontSize = inputValueNumber;
          if (inputValueNumber > MAX_ALLOWED_FONT_SIZE) {
               updatedFontSize = MAX_ALLOWED_FONT_SIZE;
          } else if (inputValueNumber < MIN_ALLOWED_FONT_SIZE) {
               updatedFontSize = MIN_ALLOWED_FONT_SIZE;
          }

          setInputValue(String(updatedFontSize));
          updateFontSizeInSelection(String(updatedFontSize) + 'px', null);
          setInputChangeFlag(false);
     };

     const handleInputBlur = () => {
          if (inputValue !== '' && inputChangeFlag) {
               const inputValueNumber = Number(inputValue);
               updateFontSizeByInputValue(inputValueNumber);
          }
     };

     const handleButtonClick = (updateType: updateFontSizeType) => {
          if (inputValue !== '') {
               const nextFontSize = calculateNextFontSize(
                    Number(inputValue),
                    updateType,
               );
               updateFontSizeInSelection(String(nextFontSize) + 'px', null);
          } else {
               updateFontSizeInSelection(null, updateType);
          }
     };

     useEffect(() => {
          setInputValue(selectionFontSize);
     }, [selectionFontSize])

     return <div className="flex flex-row items-center gap-x-2 border-r-gray-600 borrder-[1px]">
          <Button
               type="button"
               disabled={
                    disabled ||
                    (selectionFontSize !== '' &&
                         Number(inputValue) <= MIN_ALLOWED_FONT_SIZE
                    )
               }
               isActive={
                    disabled ||
                    (selectionFontSize !== '' &&
                         Number(inputValue) <= MIN_ALLOWED_FONT_SIZE
                    )
               }
               onClick={() => handleButtonClick(updateFontSizeType.decrement)}
          >
               <Minus className='w-4 h-4' />
          </Button>

          <input
               type="number"
               value={inputValue}
               disabled={true}
               className="toolbar-item font-size-input bg-gray-700 rounded-md text-white"
               min={MIN_ALLOWED_FONT_SIZE}
               max={MAX_ALLOWED_FONT_SIZE}
               onChange={(e) => setInputValue(e.target.value)}
               onBlur={handleInputBlur}
          />

          <Button
               type="button"
               disabled={
                    disabled ||
                    (selectionFontSize !== '' &&
                         Number(inputValue) <= MIN_ALLOWED_FONT_SIZE
                    )
               }
               isActive={
                    disabled ||
                    (selectionFontSize !== '' &&
                         Number(inputValue) >= MAX_ALLOWED_FONT_SIZE
                    )
               }
               onClick={() => handleButtonClick(updateFontSizeType.increment)}
          >
               <Plus className='w-4 h-4' />
          </Button>
     </div>

}