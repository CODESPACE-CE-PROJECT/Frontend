import StudentLayout from "@/app/layout/StudentLayout";

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return (
   
      
      <StudentLayout>{children}</StudentLayout>
    
  );
}