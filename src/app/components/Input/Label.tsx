interface Props {
     isRequired?: boolean;
     text: string;
     textColor?: string;
}
export const Label: React.FC<Props> = ({ isRequired, text, textColor }) => {
     return <div className="flex justify-center items-center gap-2.5">
          <span className={`${textColor ? textColor: 'text-zinc-50'}`}>{text}</span>
          {isRequired && <span className="text-red-l">*</span>}
     </div>
}
