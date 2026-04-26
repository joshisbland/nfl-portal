import "../styles/globals.css";

export const metadata = {
  title: "NFL Portal Tracker",
  description: "NFL player tracker"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
