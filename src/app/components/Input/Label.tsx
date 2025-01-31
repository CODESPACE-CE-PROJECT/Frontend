interface Props {
     isRequired?: boolean;
     text: string;
}
export const Label: React.FC<Props> = ({ isRequired, text }) => {
     return <div className="flex justify-center items-center gap-2.5">
          <span className="text-zinc-50">{text}</span>
          {isRequired && <span className="text-[#EF4343]">*</span>}
     </div>
}
