import { useContext } from "react";
import reactLogo from "./assets/react.svg";
import Moon from "./assets/moon.svg";
import Sun from "./assets/sun.svg";
import Share from "./assets/share.svg";
import Download from "./assets/download.svg";
import Github from "./assets/github.svg";
import { PlaygroundContext } from "./PlaygroundContext";
import { downloadProject } from "./utils";
import "./index.css";

const Header = () => {
  const { files, theme, toggleTheme } = useContext(PlaygroundContext);

  function toggleDark() {
    const cls = document.documentElement.classList;
    cls.toggle("dark");
    localStorage.setItem(
      "react-playground-prefer-dark",
      String(cls.contains("dark"))
    );
    toggleTheme(cls.contains("dark"));
  }

  async function copyLink() {
    await navigator.clipboard.writeText(location.href);
    alert("Sharable URL has been copied to clipboard.");
  }

  return (
    <nav>
      <h1 className="title">
        <img src={reactLogo} alt="logo" />
        <span>React Playground</span>
      </h1>
      <div className="links">
        <button
          title="Toggle dark mode"
          className="toggle-dark"
          onClick={toggleDark}
        >
          <img src={theme === "dark" ? Moon : Sun} alt={theme} />
        </button>
        <button title="Copy sharable URL" className="share" onClick={copyLink}>
          <img src={Share} alt="share" />
        </button>
        <button
          title="Download project files"
          className="download"
          onClick={() => downloadProject(files)}
        >
          <img src={Download} alt="download" />
        </button>
        <a
          href="https://github.com/swl19960204/react-playground"
          target="_blank"
          title="View on GitHub"
          className="github"
        >
          <img src={Github} alt="github" />
        </a>
      </div>
    </nav>
  );
};
export default Header;
