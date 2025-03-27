import { LexicalViewer } from "../LexicalEditor/LexicalViewer";
interface Props {
     title?: string,
     value?: string
}

export const ProblemDescription: React.FC<Props> = ({ title, value }) => {
     return <LexicalViewer namespace="Problem Description" value={value} className="border border-gray-600 rounded-lg p-4">
          <p className="text-center text-2xl font-semibold mb-3">{title}</p>
     </LexicalViewer>
}
