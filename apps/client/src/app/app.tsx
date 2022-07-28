import './app.scss';

import { Flex, Box } from '@chakra-ui/react';
import { Landing, Credits } from '@drawhub/client/public';
import { Footer, Header, ProtectedRoute } from '@drawhub/client/ui';
import { Route, Routes } from 'react-router-dom';
import { Home } from '@drawhub/client/home';

export function App() {
  return (
    <Flex direction={'column'} h={'100%'}>
      <Header />
      <Box flex={'1 1 auto'} pl={5} pr={5}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/home/*" element={<ProtectedRoute component={Home} />} />
        </Routes>
      </Box>
      <Footer />
    </Flex>
  );
}

export default App;
