import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CursorFollower } from "@/components/cursor-follower";
import { CustomLenis } from "@/components/custom-lenis";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Viraj Jain | Portfolio",
  description: "Computer Science Engineering Student & Full-Stack Developer",
  openGraph: {
    title: "Viraj Jain | Portfolio",
    description: "Computer Science Engineering Student & Full-Stack Developer",
    url: "https://viraj-jain.vercel.app",
    siteName: "Viraj Jain Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <CustomLenis>
            <CursorFollower />
            {children}
            <Toaster />
          </CustomLenis>
        </ThemeProvider>
      </body>
    </html>
  );
}
