import { useState, useEffect } from "react";

import Terminal from "./components/Terminal";
import Sidebar from "./components/Sidebar";
import Tabs from "./components/Tabs";
import CodeEditor from "./components/CodeEditor";
import ActivityBar from "./components/ActivityBar";
import ContactForm from "./components/ContactForm";
import WelcomeScreen from "./components/WelcomeScreen";

import { translations } from "./translations/translations";

import "./styles.css";

export default function App() {

  // =========================
  // LANGUAGE
  // =========================
  const [language, setLanguage] =
    useState("es");

  const t = translations[language];

  // =========================
  // TABS
  // =========================
  const [tabs, setTabs] = useState([
    // { id: "terminal", type: "terminal" },
    // { id: "about", type: "file" }
  ]);

  const [activeTab, setActiveTab] =
    useState(tabs[0]);

  // =========================
  // SIDEBAR VIEW
  // =========================
  const [activeView, setActiveView] =
    useState("explorer");

  // =========================
  // TERMINAL
  // =========================
  const [terminalOutput, setTerminalOutput] =
    useState([]);

  const [terminalInput, setTerminalInput] =
    useState("");

  // =========================
  // UPDATE TERMINAL LANGUAGE
  // =========================
  useEffect(() => {

    setTerminalOutput([
      t.terminalWelcome
    ]);

  }, [language]);

  // =========================
  // OPEN TAB
  // =========================
  const openTab = (id, type = "file") => {

    if (id === "contact") {
      type = "contact";
    }

    if (id === "terminal") {
      type = "terminal";
    }

    const exists = tabs.find(
      (t) =>
        t.id === id &&
        t.type === type
    );

    if (!exists) {

      const newTab = { id, type };

      setTabs((prev) => [
        ...prev,
        newTab
      ]);

      setActiveTab(newTab);

    } else {

      setActiveTab(exists);

    }
  };

  // =========================
  // RENDER CONTENT
  // =========================
  const renderContent = () => {

    // WELCOME SCREEN
    if (!activeTab) {
      return (
        <WelcomeScreen t={t} />
      );
    }

    // FILES
    if (activeTab.type === "file") {

      return (
        <CodeEditor
          activeFile={activeTab.id}
          language={language}
        />
      );
    }

    // CONTACT
    if (activeTab.type === "contact") {

      return (
        <ContactForm t={t} />
      );
    }

    // TERMINAL
    if (activeTab.type === "terminal") {

      return (
        <Terminal
          t={t}
          openTab={openTab}
          input={terminalInput}
          setInput={setTerminalInput}
          output={terminalOutput}
          setOutput={setTerminalOutput}
        />
      );
    }

    return null;
  };

  // =========================
  // APP
  // =========================
  return (
    <div className="app">

      <ActivityBar
        openTab={openTab}
        activeView={activeView}
        setActiveView={setActiveView}
        t={t}
      />

      <Sidebar
        openTab={openTab}
        t={t}
        language={language}
      />

      {/* LANGUAGE SWITCH */}
      <div className="language-switch">

        <button
          onClick={() => setLanguage("es")}
        >
          ES
        </button>

        <button
          onClick={() => setLanguage("en")}
        >
          EN
        </button>

      </div>

      <div className="editor">

        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setTabs={setTabs}
          t={t}
        />

        {renderContent()}

      </div>

    </div>
  );
}