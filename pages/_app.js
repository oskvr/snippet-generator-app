import "../styles/globals.css";
import Link from "next/link";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <header className="space-x-5">
        <Link href="/">
          <a>Tailwind</a>
        </Link>
        <Link href="/vanilla">
          <a>Vanilla</a>
        </Link>
        <Link href="/editor">
          <a>Editor</a>
        </Link>
      </header>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
