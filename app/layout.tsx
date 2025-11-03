import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "McDonald's AI Agent",
  description: 'Friendly assistant for menu, nutrition, and ordering guidance',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="container">
          <header className="header">
            <span className="logo">??</span>
            <h1 className="title">McDonald's AI Agent</h1>
          </header>
          {children}
          <footer className="footer">
            <p>Unofficial demo assistant. Menu info may vary by location.</p>
          </footer>
        </main>
      </body>
    </html>
  );
}
