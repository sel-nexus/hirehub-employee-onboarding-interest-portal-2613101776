import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const AUTH_KEY = 'hirehub_admin_auth';

/** Render persistent navigation and session-aware administrator actions.
 *
 * Returns:
 *   The HireHub application header.
 */
export default function Header() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const refreshSession = () => setIsAuthenticated(sessionStorage.getItem(AUTH_KEY) === 'true');
    refreshSession();
    window.addEventListener('focus', refreshSession);
    return () => window.removeEventListener('focus', refreshSession);
  }, []);

  /** Clear the demo session and return to the landing route. */
  function handleLogout() {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    navigate('/');
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/">HireHub</Link>
        <nav aria-label="Primary navigation" className="primary-nav">
          <NavLink end to="/">Home</NavLink>
          <NavLink to="/apply">Apply</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>
        {isAuthenticated ? (
          <button className="header-action header-logout" type="button" onClick={handleLogout}>Logout</button>
        ) : (
          <Link className="header-action" to="/admin">Login</Link>
        )}
      </div>
    </header>
  );
}
