import { Grid } from '@chakra-ui/react';
import { ApiProvider } from '@drawhub/client/api';
import { Dashboard } from './dashboard/dashboard';
import { Draw } from './draw/draw';
import { EmptyDisplay } from '@drawhub/client/ui';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/sidebar';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <ApiProvider>
      <Grid h={'100%'} columnGap={5} templateColumns={'max-content auto'}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/draw/:canvasId" element={<Draw />} />
          {/* TODO: Replace with Profile page */}
          <Route path="/profile" element={<EmptyDisplay />} />
        </Routes>
      </Grid>
    </ApiProvider>
  );
}

export default Home;
