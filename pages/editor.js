import { useState } from "react";
import Head from "next/head";
export default function Editor() {
  const [output, setOutput] = useState("hej");
  const words = output.split(" ");
  function handleChange(e) {
    setOutput(e.target.value);
  }
  function parse(word) {
    switch (word.substr(0, 1)) {
      case "#":
        return {
          word: word.substr(1, word.length),
          class: "text-4xl font-thin",
        };
      case "!":
        return {
          word: word.substr(1, word.length),
          class: "uppercase",
        };
      case "{":
        return {
          word: word.substr(1, word.length),
          class: "font-mono bg-red-100 text-red-800",
        };
      case "&":
        return {
          word: word.substr(1, word.length),
          class: "animate-bounce text-green-600 inline-block",
        };
      case "\\":
        return {
          word: word.substr(1, word.length),
          class: "",
        };
      default:
        return {
          word: word,
          class: "",
        };
    }
  }
  return (
    <>
      <Head>
        <title>Markdown Editor</title>
      </Head>
      <main className="p-5">
        <h1 class="text-5xl font-medium p-5">Shitty Markdown Editor</h1>
        <div className="grid grid-cols-auto-300 gap-4">
          <section className="h-80vh">
            <textarea
              name=""
              id=""
              className="border-2 w-full h-full"
              onChange={(e) => handleChange(e)}
            ></textarea>
          </section>
          <section className="h-80vh">
            <article
              name=""
              id=""
              className="border-2 w-full h-full overflow-auto break-words bg-white"
            >
              {words.map((word) => {
                const parsed = parse(word);
                return <span className={parsed.class}>{parsed.word} </span>;
              })}
            </article>
          </section>
        </div>
      </main>
    </>
  );
}
