import { useEffect } from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Preview from "./preview/Preview";
import Header from "./Header";
import { PlaygroundProvider } from "./PlaygroundProvider";
import Editor from "./editor/index";

function App() {
  useEffect(() => {
    const setVH = () => {
      document.documentElement.style.setProperty(
        "--vh",
        window.innerHeight + `px`
      );
    };
    window.addEventListener("resize", setVH);
    setVH();
    return () => window.removeEventListener("resize", setVH);
  }, []);

  return (
    <PlaygroundProvider>
      <Header />
      <div className="playground">
        <Allotment defaultSizes={[100, 100]}>
          <Allotment.Pane minSize={500}>
            <Editor />
          </Allotment.Pane>
          <Allotment.Pane minSize={0}>
            <Preview />
          </Allotment.Pane>
        </Allotment>
      </div>
    </PlaygroundProvider>
  );
}

export default App;
