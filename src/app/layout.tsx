import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "../services/clerk/components/ClerkProvider";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

const outfitSans = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creator Hub",
  description: "A platform for brands to find and collaborate with content creators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${outfitSans.variable} antialiased font-sans`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableColorScheme
            disableTransitionOnChange
          >
            {children}
            <Toaster/>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
