import Editor, { OnMount, EditorProps } from "@monaco-editor/react";
import { editor } from "monaco-editor";

export interface EditorFile {
  name: string;
  value: string;
  language: string;
}

interface CodeEditorProps {
  file: EditorFile;
  onChange?: EditorProps["onChange"];
  options?: editor.IStandaloneEditorConstructionOptions;
  theme?: "dark" | "light";
}
const CodeEditor = (props: CodeEditorProps) => {
  const { file, onChange, options, theme } = props;
  console.log("🚀 ~ CodeEditor ~ theme:", theme);

  const handleEditorMount: OnMount = (editor, monaco) => {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
    });
  };

  return (
    <Editor
      width="100%"
      height="calc(100% - var(--header-height))"
      path={file.name}
      language={file.language}
      onMount={handleEditorMount}
      onChange={onChange}
      value={file.value}
      options={{
        fontSize: 14,
        tabSize: 2,
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false,
        },
        theme: `vs-${theme}`,
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        ...options,
      }}
    />
  );
};
export default CodeEditor;
