import Head from "next/head";
import { parse } from "postcss";
import { useEffect, useRef, useState } from "react";
import CopyButton from "../components/CopyButton.js";
import TextInput from "../components/TextInput.js";

export default function Home() {
  const [tabTrigger, setTabTrigger] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const bodyArray = body.split("\n").map((line) => line);
  useEffect(() => {
    setGeneratedCode(
      `"${description}": {
        "prefix": "${tabTrigger}",
        "body": [  
          ${bodyArray
            .map((line, index) => {
              const unescapedQuotes = /(?<!\\)"/g; // Matches any double quote without a preceding escape character. Matches ->"hi"<- NOT -> \"
              const literalBackslashes = /\\(?!")+/g; // Matches all literal backslashes (i.e any not used for escaping other characters)
              let parsedLine = line
                .replaceAll(unescapedQuotes, '\\"')
                .replaceAll(literalBackslashes, "\\\\\\\\"); // JSON requires at least 4 backslashes for every single backslash, so to output 2 we need 8 backslashes... Disgusting.
              parsedLine = `"${parsedLine}",\n`;
              if (index === 0) {
                return parsedLine;
              } else {
                return " ".repeat(10) + parsedLine;
              }
            })
            .join("")}
        ],
        "description": "${description}"
      }`
    );
  }, [tabTrigger, description, body, bodyArray]);
  useEffect(() => {
    setIsCopied(false);
  }, [tabTrigger, description, body]);

  return (
    <div className="container mx-auto ">
      <Head>
        <title>Snippet Generator App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid grid-cols-1 md:grid-cols-auto-300 gap-10">
        <section class="h-80vh shadow-lg">
          <div className="bg-blue-500 rounded-t-lg p-2 space-x-5">
            <TextInput
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <TextInput
              onChange={(e) => setTabTrigger(e.target.value)}
              placeholder="Tab trigger"
            />
          </div>
          <textarea
            className="bg-blue-50 p-2 w-full h-full focus:outline-none border"
            rows="40"
            cols="50"
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write your code here"
            style={{ resize: "none" }}
          ></textarea>
        </section>
        <section class="h-80vh shadow-lg">
          <header className="p-5 bg-blue-500 rounded-t-lg">
            <h3 className="text-white text-2xl text-center">Output:</h3>
          </header>
          <div className="relative group h-full w-full overflow-auto whitespace-pre-wrap">
            <CopyButton
              isCopied={isCopied}
              setIsCopied={setIsCopied}
              textToCopy={generatedCode}
            />
            <pre className="bg-blue-50 whitespace-pre-wrap h-full w-full border">
              {generatedCode}
            </pre>
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
