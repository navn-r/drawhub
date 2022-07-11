import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io();

/**
 * @see https://socket.io/how-to/use-with-react-hooks
 */
export function useSocket(event: string) {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    // React 18 double useEffect shenanigans
    if (socket.hasListeners(event)) {
      return;
    }

    console.info('USE EFFECT');

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on(event, (data) => {
      // TODO: ADD EVENT HANDLER
      console.log(data);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [event]);

  const send = (data: unknown) => {
    socket.emit(event, data);
  };

  return {
    isConnected,
    send,
  };
}

export default useSocket;
