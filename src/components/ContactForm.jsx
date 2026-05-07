import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // 🔐 validación básica
    if (!form.name || !form.email || !form.message) {
      setStatus("⚠ Completa todos los campos");
      return;
    }

    if (form.message.length < 10) {
      setStatus("⚠ El mensaje es demasiado corto");
      return;
    }

    setLoading(true);
    setStatus("⏳ Enviando mensaje...");

    emailjs
      .send(
        import.meta.env.VITE_EMAIL_SERVICE,
        import.meta.env.VITE_EMAIL_TEMPLATE,
        {
          name: form.name,
          email: form.email,
          message: form.message
        },
        import.meta.env.VITE_EMAIL_KEY
      )
      .then(() => {
        setStatus("✔ Mensaje enviado con éxito. Te responderé lo antes posible 🚀");
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setStatus("✖ Error al enviar mensaje. Intenta más tarde.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 🔐 email protegido
  const email = ["rgaso.info.j", "@", "gmail.com"].join("");

  return (
    <div className="contact-container">
      <div className="contact-box">

        <h2 className="contact-title">Contáctame</h2>

        <form className="contact-form" onSubmit={sendEmail}>
          <input
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Correo"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Cuéntame sobre tu proyecto..."
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar mensaje"}
          </button>
        </form>

        <div className="contact-status">{status}</div>

        {/* ICONOS PRO */}
        <div className="contact-icons">
          <div
            className="icon"
            data-tooltip="Email"
            onClick={() =>
              (window.location.href = `mailto:${email}`)
            }
          >
            <FaEnvelope />
          </div>

          <div
            className="icon"
            data-tooltip="GitHub"
            onClick={() =>
              window.open("https://github.com/R-montano", "_blank", "noopener,noreferrer")
            }
          >
            <FaGithub />
          </div>

          <div
            className="icon"
            data-tooltip="LinkedIn"
            onClick={() =>
              window.open("https://www.linkedin.com/in/josue-gazo-4b49a1324", "_blank", "noopener,noreferrer")
            }
          >
            <FaLinkedin />
          </div>
        </div>

      </div>
    </div>
  );
}