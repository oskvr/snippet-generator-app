import Head from "next/head";
import { useEffect, useState } from "react";

export default function Vanilla() {
  const [tabTrigger, setTabTrigger] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);
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
  }, [tabTrigger, description, body, bodyArray]);
  function copyToClipboard() {
    navigator.clipboard.writeText(generatedCode);
    console.log("copied");
    setIsCopied(true);
  }
  return (
    <div>
      <Head>
        <title>Snippet Generator App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section>
          <div>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <input
              type="text"
              value={tabTrigger}
              onChange={(e) => setTabTrigger(e.target.value)}
              placeholder="Tab trigger"
            />
          </div>
          <textarea
            value={body}
            rows="40"
            cols="50"
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>
        </section>
        <section>
          <header>
            <h3>Output:</h3>
          </header>
          <div>
            <div>
              <button onClick={copyToClipboard}>
                {isCopied ? "Copied" : "Copy snippet"}
              </button>
            </div>
            <button>COPY</button>
            <div>
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
