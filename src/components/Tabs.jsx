export default function Tabs({
  tabs,
  activeTab,
  setActiveTab,
  setTabs
}) {
  const closeTab = (tabToClose, e) => {
    e.stopPropagation();

    const newTabs = tabs.filter(
      (t) =>
        !(t.id === tabToClose.id && t.type === tabToClose.type)
    );

    setTabs(newTabs);

    if (
      activeTab.id === tabToClose.id &&
      activeTab.type === tabToClose.type
    ) {
      setActiveTab(newTabs[newTabs.length - 1] || null);
    }
  };

  const getTabName = (tab) => {
    if (tab.type === "terminal") return "terminal";
    return `${tab.id}.js`;
  };

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
          <span>{getTabName(tab)}</span>

          <span
            className="close"
            onClick={(e) => closeTab(tab, e)}
          >
            ✕
          </span>
        </div>
      ))}
    </div>
  );
}