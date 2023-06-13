import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "PromptShareApp",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/images/logo.svg" />
      </head>
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>
        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
