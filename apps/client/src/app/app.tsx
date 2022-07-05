import './app.scss';

import { Flex, Box } from '@chakra-ui/react';
import { ClientLanding } from '@drawhub/client/landing';
import { Footer, Header } from '@drawhub/client/ui';
import { Route, Routes } from 'react-router-dom';
import { ClientCredits } from '@drawhub/client/credits';

export function App() {
  return (
    <Flex direction={'column'} h={'100%'}>
      <Header />
      <Box flex={'1 1 auto'} p={5}>
        <Routes>
          <Route path="/" element={<ClientLanding />} />
          <Route path="/credits" element={<ClientCredits />} />
        </Routes>
      </Box>
      <Footer />
    </Flex>
  );
}

export default App;
