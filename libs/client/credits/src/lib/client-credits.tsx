import { Box, Center, Heading, Link, ListItem, UnorderedList } from '@chakra-ui/react';

const data = [
  {
    title: 'Development Resources',
    items: [
      {
        text: 'Nx Documentation',
        href: 'https://nx.dev/getting-started/intro',
      },
      {
        text: 'Chakra UI Documentation',
        href: 'https://chakra-ui.com/',
      },
      {
        text: 'unDraw SVG Assets',
        href: 'https://undraw.co',
      },
      {
        text: 'React Icons',
        href: 'https://github.com/react-icons/react-icons',
      },
    ],
  },
  {
    title: 'Project Scaffolding Resources',
    items: [
      {
        text: '@nrwl/nest Official documentation',
        href: 'https://nx.dev/packages/nest',
      },
      {
        text: '@nrwl/react Official documentation',
        href: 'https://nx.dev/packages/react',
      },
      {
        text: 'Effective React Development with Nx - Jack Hsu and Juri Strumpflohner',
        href: 'https://f.hubspotusercontent20.net/hubfs/2757427/effective-react-with-nx-2022.pdf',
      },
      {
        text: 'Node Nx Tutorial',
        href: 'https://nx.dev/node-tutorial/01-create-application',
      },
      {
        text: "Introduction to Building API's with NestJS and Nrwl Nx - @beeman",
        href: 'https://dev.to/beeman/introduction-to-building-api-s-with-nestjs-and-nrwl-nx-1l2b',
      },
    ],
  },
  {
    title: 'Deployment Setup Resources',
    items: [
      {
        text: 'Nx, NestJs, React — Docker Deploys - @swlh',
        href: 'https://medium.com/swlh/nx-nestjs-react-docker-deploys-928a55fc19fd',
      },
    ],
  },
];

/* eslint-disable-next-line */
export interface ClientCreditsProps {}

export function ClientCredits(props: ClientCreditsProps) {
  return (
    <Box w={'max-content'} m={'0 auto'}>
      <Center>
        <Heading size={'2xl'} mb={10} bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text" width={'min-content'}>
          Credits
        </Heading>
      </Center>
      {data.map(({ title, items }) => (
        <>
          <Heading size={'md'}>{title}</Heading>
          <UnorderedList pl={5} mt={3} mb={5}>
            {items.map(({ text, href }) => (
              <ListItem>
                <Link href={href}>{text}</Link>
              </ListItem>
            ))}
          </UnorderedList>
        </>
      ))}
    </Box>
  );
}

export default ClientCredits;