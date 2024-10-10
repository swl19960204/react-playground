import React, { useRef, useState } from "react";
import classnames from "classnames";

// import React, { useState } from "react";

export interface FileSelectorItemProps {
  value: string;
  actived: boolean;
  readonly: boolean;
  onClick: () => void;
  onEditComplete: (fileName: string) => void;
  onRemove: () => void;
}

const FileSelectorItem: React.FC<FileSelectorItemProps> = (props) => {
  const {
    value,
    actived = false,
    readonly,
    onClick,
    onEditComplete,
    onRemove,
  } = props;
  console.log("🚀 ~ value:", value);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [pendingFilename, setPendingFilename] = useState(value);
  //   console.log("🚀 ~ pendingFilename:", pendingFilename)
  const handleDoubleClick = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 0);
  };

  const doneNameFile = () => {
    if (!editing) return;

    setEditing(false);
    onEditComplete(pendingFilename);
    // setName(inputRef.current?.value);
  };

  const deleteFile = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    onRemove?.();
  };
  {
    /* <span class="file pending">{{ pendingFilename }}</span> */
  }

  return (
    <div
      className={classnames("file", {
        active: actived || null,
        // pending: editing || null,
      })}
      onClick={onClick}
      onDoubleClick={handleDoubleClick}
    >
      {editing ? (
        <input
          ref={inputRef}
          spellCheck="false"
          value={pendingFilename}
          onChange={(e) => setPendingFilename(e.target.value)}
          onBlur={doneNameFile}
          onKeyUp={(e: React.KeyboardEvent) => {
            if (e.keyCode === 13 || e.keyCode === 27) {
              doneNameFile();
            }
          }}
        />
      ) : (
        <>
          <span>{pendingFilename}</span>
          {!readonly && (
            <span className="remove" onClick={deleteFile}>
              <svg className="icon" width="12" height="12" viewBox="0 0 24 24">
                <line stroke="#999" x1="18" y1="6" x2="6" y2="18" />
                <line stroke="#999" x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </span>
          )}
        </>
      )}
    </div>
  );
};
export default FileSelectorItem;
