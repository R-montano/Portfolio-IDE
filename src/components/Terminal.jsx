export default function Terminal({
  openTab,
  input,
  setInput,
  output,
  setOutput
}) {

  // 🧠 mensaje inicial reutilizable
  const initialMessage = "Bienvenido a la terminal. Escribe 'help' para ver comandos.";

  const handleCommand = (cmd) => {
    const clean = cmd.trim().toLowerCase();

    let response = [];

   switch (true) {
  case clean === "help":
    response = [
      "Comandos disponibles:",
      "- about",
      "- projects",
      "- skills",
      "- contact",
      "- whoami",
      "- clear",
      "- email"
    ];
    break;

  case clean === "about":
  case clean === "cd about":
    openTab("about", "file");
    response = ["Abriendo sección about..."];
    break;

  case clean === "projects":
  case clean === "cd projects":
    openTab("projects", "file");
    response = ["Abriendo proyectos..."];
    break;

  case clean === "skills":
    response = ["React, JavaScript, CSS, HTML, Node.js, Next.js, TypeScrip..."];
    break;

  case clean === "whoami":
    response = ["Rommel Josue Gaso - Frontend Developer"];
    break;

  case clean === "contact":
    openTab("contact", "contact");
    response = [
      "Inicializando módulo de contacto...",
      "Abriendo formulario..."
    ];
    break;

    case clean === "email": {
  const email = ["rgaso.info.j", "@", "gmail.com"].join("");

  response = [
    "Preparando cliente de correo...",
    "Redirigiendo..."
  ];

  setTimeout(() => {
    window.location.href = `mailto:${email}`;
  }, 1000);

  break;
}

  case clean.startsWith("open "): {
    const file = clean.replace("open ", "");
    openTab(file, "file");
    response = [`Abriendo ${file}...`];
    break;
  }

  case clean === "clear":
    setOutput([initialMessage]);
    setInput("");
    return;

  default:
    response = [`Comando no reconocido: ${clean}`];
}

    setOutput((prev) => [...prev, `> ${clean}`, ...response]);
    setInput("");
  };

  return (
    <div className="terminal">
      <div className="terminal-output">
        {output.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>

      <div className="terminal-input">
        <span>$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCommand(input);
          }}
          autoFocus
        />
      </div>
    </div>
  );
}