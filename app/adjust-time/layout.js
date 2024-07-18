import "../globals.css";

export const metadata = {
  title: "Gender Reveal Time",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
