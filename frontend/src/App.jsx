import { Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import LandingPage from './pages/LandingPage.jsx';
import InterestForm from './pages/InterestForm.jsx';
import AdminPage from './pages/AdminPage.jsx';

/** Compose shared navigation and application routes.
 *
 * Returns:
 *   The HireHub route tree.
 */
export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/apply" element={<InterestForm />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>
    </div>
  );
}
