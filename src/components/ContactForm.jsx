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

    setLoading(true);
    setStatus("⏳ Enviando mensaje...");

    emailjs
      .send(
        "service_6up4zga",
        "template_01bx5oc",
        {
          name: form.name,
          email: form.email,
          message: form.message
        },
        "ibym-s0DbAtp68Cez"
      )
      .then(() => {
        setStatus("✔ Mensaje enviado correctamente. Me pondré en contacto contigo pronto.");
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setStatus("✖ Error al enviar mensaje");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="contact-container">
      <div className="contact-box">

        <h2 className="contact-title">Formulario de contacto</h2>

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
            placeholder="Mensaje"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>

        <div className="contact-status">{status}</div>

        <div className="contact-icons">
          <div
            className="icon"
            data-tooltip="Email"
            onClick={() =>
              window.location.href = "mailto:tuemail@gmail.com"
            }
          >
            <FaEnvelope />
          </div>

          <div
            className="icon"
            data-tooltip="GitHub"
            onClick={() =>
              window.open("https://github.com/tuusuario", "_blank")
            }
          >
            <FaGithub />
          </div>

          <div
            className="icon"
            data-tooltip="LinkedIn"
            onClick={() =>
              window.open("https://linkedin.com/in/tuusuario", "_blank")
            }
          >
            <FaLinkedin />
          </div>
        </div>

      </div>
    </div>
  );
}