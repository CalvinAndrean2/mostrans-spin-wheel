import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "Mostrans Spin Wheel",
  description: "Made by MOSTECH",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">{children}</body>
    </html>
  );
}
