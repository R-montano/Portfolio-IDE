import {
  VscFiles,
  VscTerminal,
  VscMail
} from "react-icons/vsc";

export default function ActivityBar({
  openTab,
  activeView,
  setActiveView,
  t
}) {
  return (
    <div className="activity-bar">

      {/* EXPLORER */}
      <div
        className={`activity-item ${
          activeView === "explorer"
            ? "active"
            : ""
        }`}
        title={t.explorer}
        onClick={() => {

          setActiveView("explorer");

          openTab("about", "file");

        }}
      >
        <VscFiles />
      </div>

      {/* CONTACT */}
      <div
        className={`activity-item ${
          activeView === "contact"
            ? "active"
            : ""
        }`}
        title={t.contact}
        onClick={() => {

          setActiveView("contact");

          openTab("contact", "contact");

        }}
      >
        <VscMail />
      </div>

      {/* TERMINAL */}
      <div
        className={`activity-item ${
          activeView === "terminal"
            ? "active"
            : ""
        }`}
        title={t.terminal}
        onClick={() => {

          setActiveView("terminal");

          openTab("terminal", "terminal");

        }}
      >
        <VscTerminal />
      </div>

    </div>
  );
}