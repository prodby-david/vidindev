import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans, Space_Grotesk, Caveat } from "next/font/google";
import { ThemeProvider } from "@/shared/providers/theme-provider";
import AppLayoutShell from "@/shared/components/layout/AppLayoutShell";
import { Toaster } from "@/shared/components/ui";

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
  title: "John David Gaspar - Full-Stack Software Engineer",
  description:
    "Full-stack software engineer building software around problems worth solving. Specializing in Next.js, TypeScript, PostgreSQL, and resilient web applications.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${caveat.variable} antialiased`}
    >
      <body className="min-h-screen min-w-[350px] overflow-x-hidden flex flex-col">
        <ThemeProvider>
          <AppLayoutShell>{children}</AppLayoutShell>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
