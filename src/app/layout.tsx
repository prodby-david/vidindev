import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans, Space_Grotesk, Caveat } from "next/font/google";
import { ThemeProvider } from "@/shared/providers/theme-provider";
import AppLayoutShell from "@/shared/components/layout/AppLayoutShell";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "John David Gaspar - Software Engineer",
  description:
    "I am a software engineer with a passion for building web applications. I have experience in React, Next.js, and Node.js. I am always looking to learn new technologies and improve my skills.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${caveat.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <AppLayoutShell>{children}</AppLayoutShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
