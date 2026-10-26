import { Suspense, lazy } from 'react';
import Layout from './components/layout/Layout';

// Loaded only on /admin so visitors never download the admin code
const Admin = lazy(() => import('./admin/Admin'));

function App() {
  if (window.location.pathname.startsWith('/admin')) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-night" />}>
        <Admin />
      </Suspense>
    );
  }

  return <Layout />;
}

export default App;
