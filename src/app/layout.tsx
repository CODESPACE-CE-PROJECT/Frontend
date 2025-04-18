import { Noto_Sans_Thai } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { SSEContext } from "@/hook/SSEContext";
import "./globals.css";

const noto = Noto_Sans_Thai({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={noto.className}>
        <ToastContainer />
        <SSEContext>
          {children}
        </SSEContext>
      </body>
    </html>
  );
}
