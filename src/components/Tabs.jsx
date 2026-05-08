export default function Tabs({
  tabs,
  activeTab,
  setActiveTab,
  setTabs,
  t
}) {

  // =========================
  // CLOSE TAB
  // =========================
  const closeTab = (tabToClose, e) => {

    e.stopPropagation();

    const newTabs = tabs.filter(
      (t) =>
        !(
          t.id === tabToClose.id &&
          t.type === tabToClose.type
        )
    );

    setTabs(newTabs);

    if (
      activeTab?.id === tabToClose.id &&
      activeTab?.type === tabToClose.type
    ) {

      setActiveTab(
        newTabs[newTabs.length - 1] || null
      );
    }
  };

  // =========================
  // TAB NAME
  // =========================
  const getTabName = (tab) => {

    // TERMINAL
    if (tab.type === "terminal") {
      return t.terminal;
    }

    // CONTACT
    if (tab.type === "contact") {
      return t.contactFile;
    }

    // ABOUT
    if (tab.id === "about") {
      return t.aboutFile;
    }

    // PROJECTS
    if (tab.id === "projects") {
      return t.projectsFile;
    }

    // SKILLS
    if (tab.id === "skills") {
      return t.skillsFile;
    }

    // DEFAULT
    return `${tab.id}.js`;
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="tabs">

      {tabs.map((tab) => (

        <div
          key={`${tab.type}-${tab.id}`}
          className={`tab ${
            activeTab?.id === tab.id &&
            activeTab?.type === tab.type
              ? "active"
              : ""
          }`}
          onClick={() => setActiveTab(tab)}
        >

          <span>
            {getTabName(tab)}
          </span>

          <span
            className="close"
            onClick={(e) =>
              closeTab(tab, e)
            }
          >
            ✕
          </span>

        </div>

      ))}

    </div>
  );
}