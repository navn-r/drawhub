import './app.scss';

import { Flex, Box } from '@chakra-ui/react';
import { ClientLanding } from '@drawhub/client/landing';
import { Footer, Header, ProtectedRoute } from '@drawhub/client/ui';
import { Route, Routes } from 'react-router-dom';
import { ClientCredits } from '@drawhub/client/credits';
import { ClientHomeShell } from '@drawhub/client/home/shell';

export function App() {
  return (
    <Flex direction={'column'} h={'100%'}>
      <Header />
      <Box flex={'1 1 auto'} p={5}>
        <Routes>
          <Route path="/" element={<ClientLanding />} />
          <Route path="/credits" element={<ClientCredits />} />
          <Route path="/home/*" element={<ProtectedRoute component={ClientHomeShell} />} />
        </Routes>
      </Box>
      <Footer />
    </Flex>
  );
}

export default App;
