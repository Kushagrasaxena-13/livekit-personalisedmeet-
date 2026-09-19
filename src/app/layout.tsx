import "./globals.css";

export const metadata = {
  title: "MeetFlow",
  description: "WebRTC video conferencing platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}