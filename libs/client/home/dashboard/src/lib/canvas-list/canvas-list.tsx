import { Wrap, WrapItem } from '@chakra-ui/react';
import CanvasCard from './canvas-card';

// TODO: Replace with shared interface from backend
interface TempCanvas {
  _id: string;
  name: string;
  contributors: string[];
  memberCount: number;
}

const exampleCanvasListData: TempCanvas[] = [
  {
    _id: '62ca3658609babd783d7915f',
    name: 'Example Canvas 1',
    memberCount: 1,
    contributors: ['navinn@example.com'],
  },
  {
    _id: '62ca367e609babd783d79161',
    name: 'Example Canvas 2',
    memberCount: 1,
    contributors: ['navinn@example.com', 'aryan@example.com', 'samyak@example.com'],
  },
];

export function CanvasList() {
  return (
    <Wrap spacing={10}>
      {exampleCanvasListData.map(({ _id, name, contributors }) => (
        <WrapItem key={_id}>
          <CanvasCard name={name} contributors={contributors} preview={'https://i.ibb.co/KVwmVGW/Teams-Image.png'} />
        </WrapItem>
      ))}
    </Wrap>
  );
}
