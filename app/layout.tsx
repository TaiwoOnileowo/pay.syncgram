import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: "SyncGram Payment Gateway",
  description: "Secure and fast payment processing for Telegram groups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <main
          className="flex min-h-screen items-center justify-center p-4"
          style={{
            background:
              "linear-gradient(159deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%)",
          }}
        >
          <div className="w-full max-w-md">
            <div className="flex justify-center mb-6">
              <Image
                src="/logo-white.svg"
                alt="SyncGram"
                width={200}
                height={50}
                className="h-10 w-auto"
              />
            </div>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
