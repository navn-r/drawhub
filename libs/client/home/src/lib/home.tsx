import { Grid } from '@chakra-ui/react';
import { ApiProvider } from '@drawhub/client/api';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import { Dashboard } from './dashboard/dashboard';
import Premium from './dashboard/premium/premium';
import { Draw } from './draw/draw';

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
          <Route path="/premium" element={<Premium />} />
        </Routes>
      </Grid>
    </ApiProvider>
  );
}

export default Home;
