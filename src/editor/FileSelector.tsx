import React, { useContext, useEffect, useRef, useState } from "react";
import { PlaygroundContext } from "../PlaygroundContext";
import {
  ENTRY_FILE_NAME,
  APP_COMPONENT_FILE_NAME,
  IMPORT_MAP_FILE_NAME,
} from "../template/files";
import FileSelectorItem from "./FileSelectorItem";

export default function FileSelector() {
  const {
    files,
    selectedFileName,
    removeFile,
    setSelectedFileName,
    updateFileName,
    addFile,
  } = useContext(PlaygroundContext);

  const [tabs, setTabs] = useState<Array<string>>([]);
  const fileSelectorRef = useRef<HTMLDivElement>(null);
  const readonlyFileNames = [
    APP_COMPONENT_FILE_NAME,
    IMPORT_MAP_FILE_NAME,
    ENTRY_FILE_NAME,
  ];
  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);
  console.log("🚀 ~ FileSelector ~ files:", files);
  console.log("🚀 ~ FileSelector ~ selectedFileName:", selectedFileName);
  const horizontalScroll = (e: React.WheelEvent) => {
    e.preventDefault();
    const el = fileSelectorRef.current!;
    const direction =
      Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const distance = 30 * (direction > 0 ? 1 : -1);
    el.scrollTo({
      left: el.scrollLeft + distance,
    });
  };

  const handleEditComplete = (name: string, prevName: string) => {
    updateFileName(prevName, name);
    setSelectedFileName(name);
  };

  const startAddFile = () => {
    const newFileName = "Comp" + Math.random().toString().slice(2, 6) + ".tsx";
    addFile(newFileName);
    setSelectedFileName(newFileName);
    // setCreating(true);
  };

  const handleRemove = (name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) {
      return;
    }

    if (selectedFileName === name) {
      setSelectedFileName(ENTRY_FILE_NAME);
    }
    removeFile(name);
  };

  return (
    <div
      ref={fileSelectorRef}
      className="file-selector"
      onWheel={horizontalScroll}
    >
      {tabs.map((item, index) => (
        <FileSelectorItem
          value={item}
          readonly={readonlyFileNames.includes(item)}
          onClick={() => {
            setSelectedFileName(item);
          }}
          actived={selectedFileName === item}
          key={item + index}
          onEditComplete={(name: string) => handleEditComplete(name, item)}
          onRemove={() => handleRemove(item)}
        />
      ))}
      <button className="add" onClick={startAddFile}>
        +
      </button>
    </div>
  );
}
