import { forwardRef, memo, useRef } from "react";

interface Props {
  onChange?: (value: string) => void;
  value?: string;
}

export const ZipCode = memo(
  forwardRef<HTMLInputElement, Props>(({ onChange, value = "" }, ref) => {
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const digit = e.target.value.replace(/\D/g, "");
      if (digit.length > 1) return;

      const newZipcode = value.split("");
      newZipcode[index] = digit;
      const updatedZipcode = newZipcode.join("");

      onChange?.(updatedZipcode);

      if (digit && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        const newZipcode = value.split("");
        newZipcode[index] = "";
        onChange?.(newZipcode.join(""));

        if (index > 0) {
          inputsRef.current[index - 1]?.focus();
        }
      }
    };

    return (
      <div className="flex w-full gap-3 self-stretch">
        {Array.from({ length: 5 }).map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            pattern="\d*"
            inputMode="numeric"
            value={value[index] || ""}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => {
              inputsRef.current[index] = el;
              if (index === 0 && ref && typeof ref !== "function") {
                ref.current = el;
              }
            }}
            className="w-10 h-10 text-zinc-50 text-center bg-[#2A3A50] rounded-[6px] focus:outline-primary"
          />
        ))}
      </div>
    );
  })
);
