import "../styles/globals.css";
import Link from "next/link";
import { useState } from "react";
function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <body className={darkMode && "dark"}>
      <button
        className="absolute top-3 right-5 focus:outline-none"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="yellow"
            class="bi bi-brightness-high-fill"
            viewBox="0 0 16 16"
          >
            <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-moon"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M14.53 10.53a7 7 0 0 1-9.058-9.058A7.003 7.003 0 0 0 8 15a7.002 7.002 0 0 0 6.53-4.47z"
            />
          </svg>
        )}
      </button>
      <div className="min-h-screen bg-primary-100 pt-10 dark:bg-gray-900 transition-bg duration-200">
        {/* <header className="space-x-5 dark:text-gray-200 p-2">
          <Link href="/">
            <a>Snippet Generator</a>
          </Link>
          <Link href="/editor">
            <a>Markdown</a>
          </Link>
        </header> */}
        <Component {...pageProps} />
      </div>
    </body>
  );
}

export default MyApp;
