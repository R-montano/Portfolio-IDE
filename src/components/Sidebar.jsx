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

export default function Sidebar({
  openTab,
  t
}) {

  const [isOpen, setIsOpen] =
    useState(false);

  return (
    <div className="sidebar">

      <h2>
        {t.explorer}
      </h2>

      {/* TERMINAL */}
      <div
        className="sidebar-item terminal-item"
        onClick={() =>
          openTab(
            "terminal",
            "terminal"
          )
        }
      >

        <VscTerminal />

        <span>
          {t.terminal}
        </span>

      </div>

      {/* FOLDER */}
      <div
        className="folder"
        onClick={() =>
          setIsOpen(!isOpen)
        }
      >

        <div className="folder-left">

          <VscFolderOpened
            className="folder-main-icon"
          />

          <span>
            {t.explorer === "EXPLORADOR"
              ? "portafolio"
              : "portfolio"}
          </span>

        </div>

        <span className="folder-icon">

          {isOpen
            ? <VscChevronDown />
            : <VscChevronRight />
          }

        </span>

      </div>

      {/* FILES */}
      {isOpen && (

        <ul className="file-list">

          <li
            onClick={() =>
              openTab(
                "about",
                "file"
              )
            }
          >

            <SiJavascript
              className="js-icon"
            />

            {t.aboutFile}

          </li>

          <li
            onClick={() =>
              openTab(
                "projects",
                "file"
              )
            }
          >

            <SiJavascript
              className="js-icon"
            />

            {t.projectsFile}

          </li>

          <li
            onClick={() =>
              openTab(
                "skills",
                "file"
              )
            }
          >

            <SiJavascript
              className="js-icon"
            />

            {t.skillsFile}

          </li>

          <li
            onClick={() =>
              openTab(
                "contact",
                "contact"
              )
            }
          >

            <SiJson
              className="json-icon"
            />

            {t.contactFile}

          </li>

        </ul>

      )}

    </div>
  );
}