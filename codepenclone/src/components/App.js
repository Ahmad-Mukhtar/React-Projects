import "../App.css";
import Editor from "./Editor";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJS] = useState("");
  const [SrcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
      </html
      `);
    }, 250);

    return ()=>clearTimeout(timeout)
  }, [html, css, js]);

  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          OnChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          OnChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          OnChange={setJS}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={SrcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default App;
