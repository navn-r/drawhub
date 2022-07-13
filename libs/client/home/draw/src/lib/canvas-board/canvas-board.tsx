import { useCallback } from 'react';
import { useRef, useEffect, useState } from 'react';
import { ReactQueryDevtoolsPanel } from 'react-query/devtools';
import { Box, Code, Flex, Heading, Text } from '@chakra-ui/react';
import { PhotoshopPicker } from 'react-color';

/* eslint-disable-next-line */
export interface CanvasBoardProps {
  width: number;
  height: number;
}

type Coordinate = {
  x: number;
  y: number;
};

export function CanvasBoard(props: CanvasBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [color, setColor] = useState('red');
  const [width, setWidth] = useState(1);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);

  const drawOnCanvas = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
    }
  }, []);

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    return { x: event.pageX - canvas.offsetLeft, y: event.pageY - canvas.offsetTop };
  };

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mousedown', drawOnCanvas);
    return () => {
      canvas.removeEventListener('mousedown', drawOnCanvas);
    };
  }, [drawOnCanvas]);

  const paint = useCallback(
    (event: MouseEvent) => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition, color, width]
  );

  const drawLine = (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');
    if (context) {
      context.strokeStyle = color;
      context.lineJoin = 'round';
      context.lineWidth = width;

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();

      context.stroke();
    }
  };

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mousemove', paint);
    return () => {
      canvas.removeEventListener('mousemove', paint);
    };
  }, [paint]);

  const exitPaint = useCallback(() => {
    setIsPainting(false);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mouseup', exitPaint);
    canvas.addEventListener('mouseleave', exitPaint);
    return () => {
      canvas.removeEventListener('mouseup', exitPaint);
      canvas.removeEventListener('mouseleave', exitPaint);
    };
  }, [exitPaint]);

  return (
    <Box w={'100%'}>
      <h1>Welcome to CanvasBoard!</h1>
      <Box borderWidth="1px" borderRadius="lg" width={props.width} height={props.height}>
        <canvas ref={canvasRef} width={props.width} height={props.height} />
      </Box>

      <Flex>
        <PhotoshopPicker
          color={color}
          onChangeComplete={(color) => {
            setColor(color.hex);
          }}
        />
        <Box
          onClick={() => setColor('#FFFFFF')}
          rounded="2xl"
          bg="red.50"
          boxShadow="md"
          border="1px"
          px="8px"
          height="30px"
          width="70px"
          fontSize="14px"
          fontWeight="semibold"
          borderColor="#ccd0d5"
          _hover={{ bg: 'red.100' }}
        >
          Eraser
        </Box>

        <input
          onChange={(event) => {
            setColor(event.target.value);
          }}
          type="color"
        ></input>
        <input
          defaultValue={'1'}
          onChange={(event) => {
            setWidth(parseInt(event.target.value));
          }}
          type="range"
          min="1"
          max="50"
        ></input>
      </Flex>
    </Box>
  );
}

export default CanvasBoard;
