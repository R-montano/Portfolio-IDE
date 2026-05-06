import Editor from "@monaco-editor/react";
import { files } from "../data/files";

export default function CodeEditor({ activeFile }) {
  if (!files[activeFile]) return null;

  return (
    <div style={{ height: "100%" }}>
      <Editor
        height="100%"
        theme="vs-dark"
        language={files[activeFile].language}
        value={files[activeFile].content}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          smoothScrolling: true,
          automaticLayout: true,
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}