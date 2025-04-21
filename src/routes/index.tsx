import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import { AppointmentPage } from '../pages/AppointmentPage';
import { PictureGallery } from '../pages/PictureGallery';
import { ErrorBoundary } from '../components/ErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary><div>Page not found</div></ErrorBoundary>,
  },
  {
    path: '/book-appointment',
    element: <AppointmentPage />,
    errorElement: <ErrorBoundary><div>Page not found</div></ErrorBoundary>,
  },
  {
    path: '/gallery',
    element: <PictureGallery />,
    errorElement: <ErrorBoundary><div>Page not found</div></ErrorBoundary>,
  }
]);

export function Router() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}