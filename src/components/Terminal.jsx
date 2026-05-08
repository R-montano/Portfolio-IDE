export default function Terminal({
  t,
  openTab,
  input,
  setInput,
  output,
  setOutput
}) {

  // =========================
  // INITIAL MESSAGE
  // =========================
  const initialMessage =
    t.terminalWelcome;

  // =========================
  // COMMANDS
  // =========================
  const handleCommand = (cmd) => {

    const clean =
      cmd.trim().toLowerCase();

    let response = [];

    switch (true) {

      // HELP
      case clean === "help":

        response = [
          t.availableCommands,
          "- about",
          "- projects",
          "- skills",
          "- contact",
          "- whoami",
          "- clear",
          "- email"
        ];

        break;

      // ABOUT
      case clean === "about":
      case clean === "cd about":

        openTab("about", "file");

        response = [
          t.openingAbout
        ];

        break;

      // PROJECTS
      case clean === "projects":
      case clean === "cd projects":

        openTab("projects", "file");

        response = [
          t.openingProjects
        ];

        break;

      // SKILLS
      case clean === "skills":

        response = [
          t.skillsResponse
        ];

        break;

      // WHOAMI
      case clean === "whoami":

        response = [
          t.whoamiResponse
        ];

        break;

      // CONTACT
      case clean === "contact":

        openTab("contact", "contact");

        response = [
          t.initializingContact,
          t.openingForm
        ];

        break;

      // EMAIL
      case clean === "email": {

        const email =
          ["rgaso.info.j", "@", "gmail.com"].join("");

        response = [
          t.preparingMail,
          t.redirecting
        ];

        setTimeout(() => {
          window.location.href = `mailto:${email}`;
        }, 1000);

        break;
      }

      // OPEN FILE
      case clean.startsWith("open "): {

        const file =
          clean.replace("open ", "");

        openTab(file, "file");

        response = [
          `${t.opening} ${file}...`
        ];

        break;
      }

      // CLEAR
      case clean === "clear":

        setOutput([initialMessage]);

        setInput("");

        return;

      // DEFAULT
      default:

        response = [
          `${t.commandNotFound}: ${clean}`
        ];
    }

    setOutput((prev) => [
      ...prev,
      `> ${clean}`,
      ...response
    ]);

    setInput("");
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="terminal">

      <div className="terminal-output">
        {output.map((line, i) => (
          <div key={i}>
            {line}
          </div>
        ))}
      </div>

      <div className="terminal-input">

        <span>$</span>

        <input
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCommand(input);
            }
          }}
          autoFocus
        />

      </div>

    </div>
  );
}