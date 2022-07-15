import { useCallback } from 'react';
import { useRef, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Input,
  Button,
  Spacer,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
} from '@chakra-ui/react';

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
  const [color, setColor] = useState('black');
  const [width, setWidth] = useState(1);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>();

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

  const drawLine = useCallback(
    (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
      if (!canvasRef.current) {
        return;
      }
      const canvas: HTMLCanvasElement = canvasRef.current;
      console.log('HERE.');
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
    },
    [color, width]
  );

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
    [isPainting, mousePosition, drawLine]
  );

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

  const clearCanvas = () => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.getContext('2d')?.clearRect(0, 0, props.width, props.height);
  };

  return (
    <Flex direction="column" align="center" justify="center">
      <h1>Welcome to CanvasBoard!</h1>
      <Box borderWidth="3px" borderColor="black" borderRadius="lg">
        {/* style={{paddingLeft:"0.5px", paddingTop: "1px"}} */}
        <canvas ref={canvasRef} width={props.width} height={props.height} />
      </Box>

      <Flex marginTop="10px" w="70%">
        <Button w="10%" colorScheme="red" onClick={() => setColor('#FFFFFF')}>
          Eraser
        </Button>

        <Spacer />
        {/* w="10%" */}
        <Input
          w="10%"
          onChange={(event) => {
            setColor(event.target.value);
          }}
          type="color"
        />
        <Spacer />
        <Slider
          w="30%"
          min={1}
          max={50}
          defaultValue={1}
          onChange={(val) => {
            setWidth(val);
          }}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>

        <Spacer />
        <Button w="10%" colorScheme="red" onClick={clearCanvas}>
          Clear
        </Button>
      </Flex>
    </Flex>
  );
}

export default CanvasBoard;
