import { withAuthenticationRequired } from '@auth0/auth0-react';

/* eslint-disable-next-line */
export interface ProtectedRouteProps {
  component: React.ComponentType;
}

export function ProtectedRoute({ component, ...options }: ProtectedRouteProps) {
  const Component = withAuthenticationRequired(component, options);
  return <Component />;
}

export default ProtectedRoute;
