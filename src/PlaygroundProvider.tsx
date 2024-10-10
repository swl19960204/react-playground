import { PropsWithChildren, useState, useEffect } from "react";
import { PlaygroundContext, Files } from "./PlaygroundContext";
import { fileName2Language, compress, uncompress } from "./utils";
import { initFiles } from "./template/files";

export const PlaygroundProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [files, setFiles] = useState<Files>(getFilesFromUrl() || initFiles);
  const [selectedFileName, setSelectedFileName] = useState("App.tsx");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  function toggleTheme(isDark: boolean) {
    setTheme(isDark ? "dark" : "light");
  }

  function getFilesFromUrl() {
    let files: Files | undefined;
    try {
      const hash = uncompress(window.location.hash.slice(1));
      files = JSON.parse(hash);
    } catch (error) {
      console.error(error);
    }
    return files;
  }

  useEffect(() => {
    const cls = document.documentElement.classList;
    toggleTheme(cls.contains("dark"));
  }, []);

  const addFile = (name: string) => {
    files[name] = {
      name,
      language: fileName2Language(name),
      value: "",
    };
    setFiles({ ...files });
  };

  useEffect(() => {
    const hash = compress(JSON.stringify(files));
    window.location.hash = hash;
  }, [files]);

  const removeFile = (name: string) => {
    delete files[name];
    setFiles({ ...files });
  };

  const updateFileName = (oldFieldName: string, newFieldName: string) => {
    if (
      !files[oldFieldName] ||
      newFieldName === undefined ||
      newFieldName === null
    )
      return;
    const { [oldFieldName]: value, ...rest } = files;
    const newFile = {
      [newFieldName]: {
        ...value,
        language: fileName2Language(newFieldName),
        name: newFieldName,
      },
    };
    setFiles({
      ...rest,
      ...newFile,
    });
  };

  return (
    <PlaygroundContext.Provider
      value={{
        files,
        selectedFileName,
        theme,
        setSelectedFileName,
        setFiles,
        addFile,
        removeFile,
        updateFileName,
        toggleTheme,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
};
