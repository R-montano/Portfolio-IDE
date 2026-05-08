export default function WelcomeScreen({ t }) {
  return (
    <div className="welcome-screen">

      <h1 className="welcome-title">
        {t.welcome}
      </h1>

      <p className="welcome-subtitle">
        {t.role}
      </p>

      <div className="welcome-stack">
        {t.stack}
      </div>

    </div>
  );
}