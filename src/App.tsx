import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';

const Home = lazy(() => import('./pages/Home'));
const Agents = lazy(() => import('./pages/Agents'));
const AgentDetail = lazy(() => import('./pages/AgentDetail'));
const Build = lazy(() => import('./pages/Build'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const UseCases = lazy(() => import('./pages/UseCases'));
const UseCaseDetail = lazy(() => import('./pages/UseCaseDetail'));
const Why = lazy(() => import('./pages/Why'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TrustCenter = lazy(() => import('./pages/TrustCenter'));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-gray-200 border-t-electric-500 rounded-full animate-spin" />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Suspense fallback={<PageLoader />}><Home /></Suspense> },
      { path: 'agents', element: <Suspense fallback={<PageLoader />}><Agents /></Suspense> },
      { path: 'agents/:agentId', element: <Suspense fallback={<PageLoader />}><AgentDetail /></Suspense> },
      { path: 'build', element: <Suspense fallback={<PageLoader />}><Build /></Suspense> },
      { path: 'blog', element: <Suspense fallback={<PageLoader />}><Blog /></Suspense> },
      { path: 'blog/:slug', element: <Suspense fallback={<PageLoader />}><BlogPost /></Suspense> },
      { path: 'about', element: <Suspense fallback={<PageLoader />}><About /></Suspense> },
      { path: 'contact', element: <Suspense fallback={<PageLoader />}><Contact /></Suspense> },
      { path: 'faq', element: <Suspense fallback={<PageLoader />}><FAQ /></Suspense> },
      { path: 'use-cases', element: <Suspense fallback={<PageLoader />}><UseCases /></Suspense> },
      { path: 'use-cases/:slug', element: <Suspense fallback={<PageLoader />}><UseCaseDetail /></Suspense> },
      { path: 'why', element: <Suspense fallback={<PageLoader />}><Why /></Suspense> },
      { path: 'tos', element: <Suspense fallback={<PageLoader />}><TermsOfService /></Suspense> },
      { path: 'privacy', element: <Suspense fallback={<PageLoader />}><PrivacyPolicy /></Suspense> },
      { path: 'trust', element: <Suspense fallback={<PageLoader />}><TrustCenter /></Suspense> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
