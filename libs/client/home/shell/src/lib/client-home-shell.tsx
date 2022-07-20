import { Grid } from '@chakra-ui/react';
import { ApiProvider } from '@drawhub/client/home/api';
import { ClientHomeDashboard } from '@drawhub/client/home/dashboard';
import { ClientHomeDraw } from '@drawhub/client/home/draw';
import { EmptyDisplay } from '@drawhub/client/ui';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './sidebar/sidebar';

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
      <Grid h={'100%'} columnGap={5} templateColumns={'max-content auto'}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<ClientHomeDashboard />} />
          <Route path="/draw/:canvasId" element={<ClientHomeDraw />} />
          {/* TODO: Replace with Profile library */}
          <Route path="/profile" element={<EmptyDisplay />} />
        </Routes>
      </Grid>
    </ApiProvider>
  );
}

export default ClientHomeShell;
