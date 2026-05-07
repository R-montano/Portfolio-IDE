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
          //  editor base
          fontSize: 14,
          automaticLayout: true,
          smoothScrolling: true,
          scrollBeyondLastLine: false,

          //  minimap
          minimap: {
            enabled: false
          },

          //  WORD WRAP 
          wordWrap: "on",
          wrappingIndent: "same",
          wrappingStrategy: "advanced",

          //  scrollbar
          scrollbar: {
            horizontal: "hidden"
          },

          //  line numbers estilo VS Code
          lineNumbers: "on",
          lineNumbersMinChars: 3,
          lineDecorationsWidth: 10,

          //  cursor 
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",

          //  highlight línea activa
          renderLineHighlight: "all",

          //  indent guides
          guides: {
            indentation: true
          },

          //  padding superior
          padding: {
            top: 10
          }
        }}
      />
    </div>
  );
}