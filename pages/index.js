import Head from "next/head";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [tabTrigger, setTabTrigger] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [tabIndex, setTabIndex] = useState(1);
  const bodyArray = body.split("\n").map((line) => `"${line}", \n`);
  useEffect(() => {
    setGeneratedCode(
      `"${description}": {
        "prefix": "${tabTrigger}",
        "body": [  
          ${bodyArray
            .map((line, index) => {
              if (index === 0) {
                return line;
              } else {
                return " ".repeat(10) + line;
              }
            })
            .join("")}
        ],
        "description": "${description}"
      }`
    );
    setIsCopied(false);
    console.log(isCopied);
  }, [tabTrigger, description, body]);
  function copyToClipboard() {
    navigator.clipboard.writeText(generatedCode);
    setIsCopied(true);
  }
  return (
    <div className="container mx-auto ">
      <Head>
        <title>Snippet Generator App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-wrap gap-5">
        <section>
          <div className="bg-gray-500 p-2 space-x-5">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-4"
              placeholder="Description"
            />
            <input
              type="text"
              value={tabTrigger}
              onChange={(e) => setTabTrigger(e.target.value)}
              className="border p-4"
              placeholder="Tab trigger"
            />
          </div>
          <textarea
            className="flex-1 border-2 bg-blue-50 p-2 h-4/6"
            value={body}
            rows="50"
            cols="70"
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>
        </section>
        <section>
          <header className="p-5 bg-gray-500">
            <h3 className="text-white text-2xl text-center">Output:</h3>
          </header>
          <div className="relative group">
            <div className="absolute top-0 left-0 w-full h-full bg-green-200 bg-opacity-0 group-hover:bg-opacity-20 grid place-items-center transition">
              <button
                onClick={copyToClipboard}
                className="relative bg-blue-400 w-32 hover:bg-blue-500 text-white p-3 opacity-0 group-hover:opacity-100 transition"
              >
                {isCopied ? "Copied" : "Copy snippet"}
              </button>
            </div>
            <div className="bg-blue-50 border p-2">
              <pre>{generatedCode}</pre>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
  function handleKeyDown(e) {
    if (e.ctrlKey && e.key === "i") {
      const selectionStart = e.target.selectionStart;
      const selectionEnd = e.target.selectionEnd;
      const firstHalf = body.substr(0, selectionStart);
      const secondHalf = body.substr(selectionEnd, body.length);
      setBody(firstHalf + `\${1:example}` + secondHalf);
    }
  }
}
