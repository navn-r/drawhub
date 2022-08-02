import { useAuth0 } from '@auth0/auth0-react';
import { Button, Center } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface ConsentPopupButtonProps {}

/**
 * Helper button to grant consent on localhost domains.
 *
 * @see https://auth0.com/docs/get-started/applications/confidential-and-public-applications/user-consent-and-third-party-applications#skip-consent-for-first-party-applications
 */
export function ConsentPopupButton(props: ConsentPopupButtonProps) {
  const { getAccessTokenWithPopup } = useAuth0();

  const retryWithPopup = async () => {
    await getAccessTokenWithPopup({ audience: process.env['NX_AUTH0_AUDIENCE'] });
  };

  if (!window.location.host.includes('localhost')) {
    return null;
  }

  return (
    <Center w={'100%'} pb={2}>
      <Button variant={'link'} onClick={() => retryWithPopup()}>
        Authorize
      </Button>
    </Center>
  );
}

export default ConsentPopupButton;
