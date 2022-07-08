import { Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Skeleton, Text } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface ClientHomeProps {}

export function ClientHome(props: ClientHomeProps) {
  const { isLoading, user } = useAuth0();

  /**
   *
   * **Note**: Every route nested under /home is protected.
   *
   * Any pages that require the user to be authenticated, should be
   * created under this library, should the route make sense under /home.
   *
   * Providers/Stores that need to be shared with nested pages should
   * also be initialized in this component.
   */
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Skeleton isLoaded={!isLoading}>
            <Text>Welcome to ClientHome, {user?.name}!</Text>
          </Skeleton>
        }
      />
    </Routes>
  );
}

export default ClientHome;
