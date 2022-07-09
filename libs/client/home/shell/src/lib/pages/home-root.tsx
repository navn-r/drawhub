import { useAuth0 } from '@auth0/auth0-react';
import { Button, Code, Skeleton, Text } from '@chakra-ui/react';
import { useCreateCanvas, useGetProtectedData } from '@drawhub/client/home/api';

export function HomeRoot() {
  const { isLoading, user } = useAuth0();
  const { status, data, error, isFetching, retryWithPopup } = useGetProtectedData();
  const mutation = useCreateCanvas();

  return (
    <Skeleton isLoaded={!isLoading}>
      <Text>Welcome to ClientHome, {user?.name}!</Text>
      <Skeleton isLoaded={!isFetching && status !== 'loading'}>
        <Code display={'block'} whiteSpace={'pre'}>
          {JSON.stringify(status !== 'error' ? data : error)}
        </Code>
        {status === 'error' ? <Button onClick={() => retryWithPopup()}>Authorize with Popup</Button> : null}
      </Skeleton>
      <Button onClick={() => mutation.mutate({ name: 'testCanvas' })}>Create testCanvas</Button>
      {mutation.isSuccess ? (
        <Code display={'block'} whiteSpace={'pre'}>
          {JSON.stringify(mutation.data)}
        </Code>
      ) : null}
    </Skeleton>
  );
}

export default HomeRoot;
