/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";

export interface MessageProps {
  type: "err" | "warn";
  content: string;
}

const Message: React.FC<MessageProps> = (props) => {
  const { type, content } = props;
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    setDismissed(!!content);
  }, [content]);
  function formatMessage(err: string | Error): string {
    if (typeof err === "string") {
      return err;
    } else {
      let msg = err.message;
      // @ts-ignore
      const loc = err.loc;
      if (loc && loc.start) {
        msg = `(${loc.start.line}:${loc.start.column}) ` + msg;
      }
      return msg;
    }
  }
  if (!dismissed) {
    return null;
  }
  return (
    <div className={`msg ${type}`}>
      <pre dangerouslySetInnerHTML={{ __html: formatMessage(content) }} />
      <button className="dismiss" onClick={() => setDismissed(false)}>
        ✕
      </button>
    </div>
  );
};

export default Message;
