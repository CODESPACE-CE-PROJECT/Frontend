import { Metadata } from "next";
import { getProblemById } from "@/actions/problem";
import { IProblem } from "@/types/problem";

type Props = {
     params: Promise<{ problemId: string }>
}

export async function generateMetadata(
     { params }: Props,
): Promise<Metadata> {
     const problemId = (await params).problemId
     const {data} = await getProblemById(problemId)
     const school: IProblem = data
     return {
          title: school.title,
          description: school.title
     }
}

export default async function Layout({ children }: { children: React.ReactNode }) {
     return <>
          {children}
     </>;
}