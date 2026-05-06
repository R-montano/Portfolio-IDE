export default function Sidebar({ openTab }) {
  return (
    <div className="sidebar">
      <h2>EXPLORADOR</h2>

      <ul>
        <li onClick={() => openTab("about", "file")}>about.js</li>
        <li onClick={() => openTab("projects", "file")}>projects.js</li>
        <li onClick={() => openTab("skills", "file")}>skills.json</li>
        <li onClick={() => openTab("contact", "file")}>contact.json</li>
        <li onClick={() => openTab("terminal", "terminal")}>terminal</li>
      </ul>
    </div>
  );
}