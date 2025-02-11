import React from 'react';


interface Props {
  label: string;
  name: string;
  value: string;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextProfileField: React.FC<Props> = ({ label, name, value, isEditing, onChange }) => {
  return (
    <div className="flex flex-col items-start space-y-1 w-full">
      <span className="font-medium text-gray-300">{label}</span>
      {isEditing ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          disabled={ name === 'ip'}
          className="pl-5 py-3 w-full text-white bg-[#2A3A50] rounded-md border border-gray-300 shadow-inner disabled:border-[#2A3A50] disabled:bg-transparent"
        />
      ) : (
        <div className="pl-3 text-white border border-[#2A3A50] rounded-md py-3 w-full">{value || '-'}</div>
      )}
    </div>
  );
};

export default TextProfileField;
