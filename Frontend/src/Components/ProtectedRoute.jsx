import React, { memo, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Memoized loading spinner to prevent unnecessary re-renders
const LoadingSpinner = memo(() => (
  <div 
    role="status" 
    aria-label="Loading" 
    className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900"
  >
    <div 
      className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"
      aria-hidden="true"
    />
    <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm font-medium">
      Securing your session...
    </p>
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { user, loading, roles } = useAuth();
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check if user has required roles
  useEffect(() => {
    if (!loading) {
      if (!user) {
        setIsAuthorized(false);
      } else if (requiredRoles.length > 0) {
        const hasRequiredRole = requiredRoles.some(role => 
          roles?.includes(role)
        );
        setIsAuthorized(hasRequiredRole);
      } else {
        setIsAuthorized(true);
      }
      setIsCheckingAuth(false);
    }
  }, [user, loading, roles, requiredRoles]);

  // Show loading state while checking authentication
  if (loading || isCheckingAuth) {
    return <LoadingSpinner />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <Navigate 
        to="/login" 
        replace 
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  // Redirect to unauthorized if user doesn't have required role
  if (!isAuthorized) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Return children if everything checks out
  return children;
};

// Memoize the component to prevent unnecessary re-renders
export default memo(ProtectedRoute, (prevProps, nextProps) => {
  // Only re-render if children or requiredRoles change
  return (
    prevProps.children === nextProps.children &&
    JSON.stringify(prevProps.requiredRoles) === 
    JSON.stringify(nextProps.requiredRoles)
  );
});