import "@styles/globals.css";
import "@styles/others.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

// The HTML layout for the entire application, has Navbar component imported which will be same throughout the
//application, metadata, and title and icon of the webapp, and enitre application wrapped within the session Provider component

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
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
