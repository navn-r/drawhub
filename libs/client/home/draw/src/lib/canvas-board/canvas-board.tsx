import { Box, VStack } from '@chakra-ui/react';
import { useSocket } from '@drawhub/client/home/api';
import { useCallback, useEffect, useRef, useState } from 'react';
import CanvasInput from './canvas-input';

export interface CanvasBoardProps {
  width: number;
  height: number;
  canvasId: string;
}

type Coordinate = {
  x: number;
  y: number;
};

export function CanvasBoard({ width, height, canvasId }: CanvasBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [brushColor, setBrushColor] = useState('black');
  const [brushSize, setBrushSize] = useState(10);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>();
  const { socket, send } = useSocket(canvasId);

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
    (originalMousePosition: Coordinate, newMousePosition: Coordinate, brushColor: string, brushSize: number) => {
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
    []
  );

  const paint = useCallback(
    (event: MouseEvent) => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event);

        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition, brushColor, brushSize);
          send('send-draw', {
            start: mousePosition,
            end: newMousePosition,
            brushColor,
            brushSize,
          });
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition, drawLine, send, brushColor, brushSize]
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

  const resetCanvas = useCallback(() => {
    if (!canvasRef.current) {
      return;
    }

    canvasRef.current.getContext('2d')?.clearRect(0, 0, width, height);
  }, [width, height]);

  const clearCanvas = useCallback(() => {
    send('send-clear', {});
    resetCanvas();
  }, [send, resetCanvas]);

  useEffect(() => {
    if (socket?.hasListeners('recieve-draw') || socket?.hasListeners('recieve-clear')) {
      return;
    }

    socket?.on('recieve-draw', ({ start, end, brushColor, brushSize }) => {
      drawLine(start, end, brushColor, brushSize);
    });

    socket?.on('recieve-clear', () => resetCanvas());

    return () => {
      socket?.removeAllListeners('recieve-draw');
      socket?.removeAllListeners('recieve-clear');
    };
  }, [drawLine, socket, resetCanvas]);

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
