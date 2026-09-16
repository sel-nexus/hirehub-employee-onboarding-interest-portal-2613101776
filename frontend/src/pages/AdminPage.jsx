import { useState } from 'react';
import AdminLogin from '../components/AdminLogin.jsx';
import AdminDashboard from '../components/AdminDashboard.jsx';

/** Select the admin login or dashboard according to browser session state.
 *
 * Returns:
 *   The appropriate administrator route surface.
 */
export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem('hirehub_admin_auth') === 'true');

  return isAuthenticated
    ? <AdminDashboard onLogout={() => setIsAuthenticated(false)} />
    : <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
}
