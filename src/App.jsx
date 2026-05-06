import { useState } from "react";
import Terminal from "./components/Terminal";
import Sidebar from "./components/Sidebar";
import Tabs from "./components/Tabs";
import CodeEditor from "./components/CodeEditor";
import ActivityBar from "./components/ActivityBar";
import ContactForm from "./components/ContactForm";
import "./styles.css";

export default function App() {
  // 🔥 sistema de tabs
  const [tabs, setTabs] = useState([
    { id: "about", type: "file" }
  ]);

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [activeView, setActiveView] = useState("explorer");

  // 🧠 estado global de terminal
  const [terminalOutput, setTerminalOutput] = useState([
    "Bienvenido a la terminal. Escribe 'help' para ver comandos."
  ]);

  const [terminalInput, setTerminalInput] = useState("");

  // 🚀 abrir tabs (controlando tipos especiales)
  const openTab = (id, type = "file") => {
    // 🔥 fuerza tipos especiales
    if (id === "contact") type = "contact";
    if (id === "terminal") type = "terminal";

    const exists = tabs.find(
      (t) => t.id === id && t.type === type
    );

    if (!exists) {
      const newTab = { id, type };
      setTabs((prev) => [...prev, newTab]);
      setActiveTab(newTab);
    } else {
      setActiveTab(exists);
    }
  };

  // 🧠 render dinámico limpio
  const renderContent = () => {
    if (!activeTab) return null;

    if (activeTab.type === "file") {
      return <CodeEditor activeFile={activeTab.id} />;
    }

    if (activeTab.type === "contact") {
      return <ContactForm />;
    }

    if (activeTab.type === "terminal") {
      return (
        <Terminal
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

  return (
    <div className="app">
      <ActivityBar
        openTab={openTab}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <Sidebar openTab={openTab} />

      <div className="editor">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setTabs={setTabs}
        />

        {renderContent()}
      </div>
    </div>
  );
}