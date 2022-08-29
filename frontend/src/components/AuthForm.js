function AuthForm({ children, state, handleChange, handleSubmit }) {
  const [title, button, question] = children;

  return (
    <main className="data">
      {title}
      <form onSubmit={handleSubmit} action="#" className="data__form">
        <input
          placeholder="Email"
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          className="data__input"
        />
        <input
          placeholder="Пароль"
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          className="data__input"
        />
        {button}
      </form>

      {question}
    </main>
  );
}

export default AuthForm;
