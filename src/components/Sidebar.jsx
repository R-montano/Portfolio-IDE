import { useState } from "react";

import {
  VscChevronDown,
  VscChevronRight,
  VscFolderOpened,
  VscTerminal
} from "react-icons/vsc";

import {
  SiJavascript,
  SiJson
} from "react-icons/si";

export default function Sidebar({ openTab }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="sidebar">

      <h2>EXPLORER</h2>

      {/* TERMINAL */}
      <div
        className="sidebar-item terminal-item"
        onClick={() => openTab("terminal", "terminal")}
      >
        <VscTerminal />
        <span>terminal</span>
      </div>

      {/* FOLDER */}
      <div
        className="folder"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="folder-left">
          <VscFolderOpened className="folder-main-icon" />
          <span>portfolio</span>
        </div>

        <span className="folder-icon">
          {isOpen ? <VscChevronDown /> : <VscChevronRight />}
        </span>
      </div>

      {/* FILES */}
      {isOpen && (
        <ul className="file-list">

          <li onClick={() => openTab("about", "file")}>
            <SiJavascript className="js-icon" />
            about.js
          </li>

          <li onClick={() => openTab("projects", "file")}>
            <SiJavascript className="js-icon" />
            projects.js
          </li>

          <li onClick={() => openTab("skills", "file")}>
            <SiJavascript className="js-icon" />
            skills.js
          </li>

          <li onClick={() => openTab("contact", "contact")}>
            <SiJson className="json-icon" />
            contact.json
          </li>

        </ul>
      )}

    </div>
  );
}