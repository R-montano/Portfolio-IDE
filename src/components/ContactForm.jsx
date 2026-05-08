import { useState } from "react";
import emailjs from "@emailjs/browser";

import {
  FaGithub,
  FaLinkedin,
  FaEnvelope
} from "react-icons/fa";

export default function ContactForm({ t }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });
  };

  // =========================
  // SEND EMAIL
  // =========================
  const sendEmail = (e) => {

    e.preventDefault();

    const isSpanish =
      t.explorer === "EXPLORADOR";

    // VALIDATION
    if (
      !form.name ||
      !form.email ||
      !form.message
    ) {

      setStatus(
        isSpanish
          ? "⚠ Completa todos los campos"
          : "⚠ Fill in all fields"
      );

      return;
    }

    // SHORT MESSAGE
    if (form.message.length < 10) {

      setStatus(
        isSpanish
          ? "⚠ El mensaje es demasiado corto"
          : "⚠ Message is too short"
      );

      return;
    }

    setLoading(true);

    setStatus(
      isSpanish
        ? "⏳ Enviando mensaje..."
        : "⏳ Sending message..."
    );

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

        setStatus(
          isSpanish
            ? "✔ Mensaje enviado con éxito. Te responderé lo antes posible 🚀"
            : "✔ Message sent successfully. I will reply as soon as possible 🚀"
        );

        setForm({
          name: "",
          email: "",
          message: ""
        });
      })

      .catch(() => {

        setStatus(
          isSpanish
            ? "✖ Error al enviar mensaje. Intenta más tarde."
            : "✖ Error sending message. Try again later."
        );
      })

      .finally(() => {
        setLoading(false);
      });
  };

  // =========================
  // PROTECTED EMAIL
  // =========================
  const email =
    ["rgaso.info.j", "@", "gmail.com"]
      .join("");

  // =========================
  // UI
  // =========================
  return (
    <div className="contact-container">

      <div className="contact-box">

        <h2 className="contact-title">
          {t.contactTitle}
        </h2>

        <form
          className="contact-form"
          onSubmit={sendEmail}
        >

          <input
            name="name"
            placeholder={
              t.explorer === "EXPLORADOR"
                ? "Nombre"
                : "Name"
            }
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder={
              t.explorer === "EXPLORADOR"
                ? "Correo"
                : "Email"
            }
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder={
              t.explorer === "EXPLORADOR"
                ? "Cuéntame sobre tu proyecto..."
                : "Tell me about your project..."
            }
            value={form.message}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? t.sending
              : t.send}
          </button>

        </form>

        <div className="contact-status">
          {status}
        </div>

        {/* ICONS */}
        <div className="contact-icons">

          <div
            className="icon"
            data-tooltip="Email"
            onClick={() =>
              (
                window.location.href =
                `mailto:${email}`
              )
            }
          >
            <FaEnvelope />
          </div>

          <div
            className="icon"
            data-tooltip="GitHub"
            onClick={() =>
              window.open(
                "https://github.com/R-montano",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            <FaGithub />
          </div>

          <div
            className="icon"
            data-tooltip="LinkedIn"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/josue-gazo-4b49a1324",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            <FaLinkedin />
          </div>

        </div>

      </div>

    </div>
  );
}