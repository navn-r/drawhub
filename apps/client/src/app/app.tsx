import './app.scss';

import { Box, Divider, Text } from '@chakra-ui/react';
import { Header } from '@drawhub/client/ui';
import { Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <>
      <Header />
      <Divider borderColor="black" />
      <Box mt={2} ml={5}>
        <Routes>
          <Route path="/" element={<Text>This is the Home Page</Text>} />
          <Route path="/credits" element={<Text>This is the Credits Page</Text>} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
