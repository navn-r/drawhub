import { Button, Center, Container, createIcon, Flex, Heading, Icon, Image, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';

/**
 * Arrow SVG, from @aianshume/codenanshu
 *
 * @see https://github.com/aianshume/codenanshu/blob/main/src/container/Hero.js
 */
const Arrow = createIcon({
  displayName: 'Arrow',
  viewBox: '0 0 72 24',
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});

/* eslint-disable-next-line */
export interface ClientLandingProps {}

const heroTextValues = [
  'together.',
  'with friends.',
  'with your team.',
  'with family.',
  'by yourself.',
  'with strangers.',
];

export function ClientLanding(props: ClientLandingProps) {
  const [heroTextIndex, setHeroTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroTextIndex((idx) => (idx + 1) % heroTextValues.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxW={'6xl'} p={2}>
      <Center>
        <Heading fontSize={'7xl'} m={20}>
          Draw,
          <Text
            as={'span'}
            color={'transparent'}
            bgClip={'text'}
            bgGradient={'linear-gradient(90deg, rgba(131, 58, 180, .9) 0%, rgba(253, 29, 29, .9) 100%)'}
          >
            {' '}
            {heroTextValues[heroTextIndex]}
          </Text>
        </Heading>
      </Center>
      <Flex justifyContent={'space-between'} columnGap={5}>
        <Stack maxW={'60ch'} spacing={10}>
          <Text fontSize={'xl'} color={'gray.500'}>
            DrawHub is the easiest and fastest way to get your ideas onto a digital canvas. Work alone, or with others
            in realtime, to create and share digital masterpeices straight to the cloud.
          </Text>
          <Flex>
            {/* TODO: Replace button with `Sign In with Google` */}
            <Button leftIcon={<FaGoogle />} colorScheme="green" size={'lg'} w={'min-content'}>
              Get Started
            </Button>
            <Icon as={Arrow} color={'gray.800'} w={71} transform={'translate(-30px, 60px) rotate(20deg)'} />
            <Text fontSize={'lg'} transform={'translate(-60px, 35px) rotate(10deg)'}>
              It's free
            </Text>
          </Flex>
        </Stack>
        <Image w={'xl'} alt={'team drawing'} src={'/assets/undraw_team_collaboration.svg'} />
      </Flex>
    </Container>
  );
}

export default ClientLanding;
