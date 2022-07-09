import { ApiProvider } from '@drawhub/client/home/api';
import { Route, Routes } from 'react-router-dom';

// FIXME: Temporary; Before moving to separate library
import HomeRoot from './pages/home-root';

/* eslint-disable-next-line */
export interface ClientHomeProps {}

export function ClientHomeShell(props: ClientHomeProps) {
  /**
   * SHELL LIBRARY
   *
   * **Note**: Every route nested under /home is protected.
   *
   * Any pages that require the user to be authenticated, should be
   * created under this folder, should the route make sense under /home.
   *
   * Providers/Stores that need to be shared with nested pages should
   * also be initialized in this folder.
   *
   * @see https://indepth.dev/posts/1117/the-shell-library-patterns-with-nx-and-monorepo-architectures
   */
  return (
    <ApiProvider>
      <Routes>
        <Route path="/" element={<HomeRoot />} />
      </Routes>
    </ApiProvider>
  );
}

export default ClientHomeShell;
