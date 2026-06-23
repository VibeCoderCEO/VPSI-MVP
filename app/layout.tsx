import "./globals.css";

export const metadata = {
  title: "Purion | Food Safety Made Visible",
  description: "VPSI Global Food Safety Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
