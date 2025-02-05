import { Noto_Sans_Thai} from "next/font/google";
import "./globals.css";
import ReduxProvider from '@/app/components/ReduxProvider'
import { ToastContainer } from "react-toastify";

const noto = Noto_Sans_Thai({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={noto.className}>
        <ToastContainer />
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
