import { useContext } from "react";
// import { debounce } from "lodash-es";
import CodeEditor from "./CodeEditor";
import FileSelector from "./FileSelector";
import { PlaygroundContext } from "../PlaygroundContext";

export default function EditorWrap() {
  const {
    files,
    theme,
    removeFile,
    addFile,
    updateFileName,
    selectedFileName,
    setFiles,
  } = useContext(PlaygroundContext);

  const selectedFile = files[selectedFileName];
  // debounce(onEditorChange, 500)
  function onEditorChange(value?: string) {
    files[selectedFile.name].value = value!;
    setFiles({ ...files });
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <FileSelector />
      <CodeEditor file={selectedFile} onChange={onEditorChange} theme={theme} />
    </div>
  );
}
