import { Box, VStack } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import CanvasInput from './canvas-input';

export interface CanvasBoardProps {
  width: number;
  height: number;
}

type Coordinate = {
  x: number;
  y: number;
};

export function CanvasBoard({ width, height }: CanvasBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [brushColor, setBrushColor] = useState('black');
  const [brushSize, setBrushSize] = useState(1);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>();

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    return { x: event.pageX - canvas.offsetLeft, y: event.pageY - canvas.offsetTop };
  };

  const setCoordinates = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    canvas.addEventListener('mousedown', setCoordinates);
    return () => {
      canvas.removeEventListener('mousedown', setCoordinates);
    };
  }, [setCoordinates]);

  const drawLine = useCallback(
    (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
      if (!canvasRef.current) {
        return;
      }

      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.strokeStyle = brushColor;
        context.lineJoin = 'round';
        context.lineWidth = brushSize;

        context.beginPath();
        context.moveTo(originalMousePosition.x, originalMousePosition.y);
        context.lineTo(newMousePosition.x, newMousePosition.y);
        context.closePath();
        context.stroke();
      }
    },
    [brushColor, brushSize]
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
    const canvas = canvasRef.current;
    canvas.addEventListener('mousemove', paint);
    return () => {
      canvas.removeEventListener('mousemove', paint);
    };
  }, [paint]);

  const exitPaint = useCallback(() => setIsPainting(false), []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    canvas.addEventListener('mouseup', exitPaint);
    canvas.addEventListener('mouseleave', exitPaint);

    return () => {
      canvas.removeEventListener('mouseup', exitPaint);
      canvas.removeEventListener('mouseleave', exitPaint);
    };
  }, [exitPaint]);

  const clearCanvas = useCallback(() => {
    if (!canvasRef.current) {
      return;
    }

    canvasRef.current.getContext('2d')?.clearRect(0, 0, width, height);
  }, [height, width]);

  return (
    <VStack spacing={5}>
      <Box borderWidth={'thick'} borderColor={'gray.500'} borderRadius={5}>
        <canvas ref={canvasRef} width={width} height={height} />
      </Box>
      <CanvasInput width={width} setBrushColor={setBrushColor} setBrushSize={setBrushSize} clearCanvas={clearCanvas} />
    </VStack>
  );
}

export default CanvasBoard;
