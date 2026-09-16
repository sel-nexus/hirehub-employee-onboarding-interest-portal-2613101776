import { useId, useState } from 'react';
import PropTypes from 'prop-types';

/** Render the PRD-specified demo administrator credential gate.
 *
 * Args:
 *   onLogin: Callback invoked after a successful session write.
 * Returns:
 *   The administrator login card.
 */
export default function AdminLogin({ onLogin }) {
  const id = useId();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  /** Validate demo credentials and establish a tab-scoped session.
   *
   * Args:
   *   event: Form submit event.
   */
  function handleSubmit(event) {
    event.preventDefault();
    if (username === 'admin' && password === 'admin') {
      sessionStorage.setItem('hirehub_admin_auth', 'true');
      onLogin();
      return;
    }
    setError('Invalid credentials. Please try again.');
  }

  return (
    <section className="admin-page">
      <form className="login-card" noValidate onSubmit={handleSubmit}>
        <h1>Admin Login</h1>
        <div className="field-group">
          <label htmlFor={`${id}-username`}>Username</label>
          <input id={`${id}-username`} onChange={(event) => { setUsername(event.target.value); setError(''); }} placeholder="Enter username" required type="text" value={username} />
        </div>
        <div className="field-group">
          <label htmlFor={`${id}-password`}>Password</label>
          <input id={`${id}-password`} onChange={(event) => { setPassword(event.target.value); setError(''); }} placeholder="Enter password" required type="password" value={password} />
        </div>
        <button className="button button-submit" type="submit">Login</button>
        {error && <p className="login-error" role="alert">{error}</p>}
      </form>
    </section>
  );
}

AdminLogin.propTypes = { onLogin: PropTypes.func.isRequired };
