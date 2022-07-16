import { useAuth0 } from '@auth0/auth0-react';
import { useCallback, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

/**
 * @see https://socket.io/how-to/use-with-react-hooks
 */
export function useSocket(canvasId: string) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useAuth0();

  useEffect(() => {
    setSocket(io());

    return () => {
      setSocket((socket) => {
        socket?.disconnect();
        return null;
      });
    };
  }, []);

  useEffect(() => {
    socket?.emit('join-room', { canvasId, email: user?.email });

    return () => {
      socket?.emit('leave-room', { canvasId, email: user?.email });
    };
  }, [canvasId, socket, user?.email]);

  useEffect(() => {
    // In case of double useEffect run
    if (socket?.hasListeners('joined-room') || socket?.hasListeners('left-room')) {
      return;
    }

    socket?.on('joined-room', (email: string) => {
      console.info(`ROOM JOINED <${email}>`);
    });

    socket?.on('left-room', (email: string) => {
      console.info(`ROOM LEFT <${email}>`);
    });

    return () => {
      socket?.removeAllListeners('joined-room');
      socket?.removeAllListeners('left-room');
    };
  }, [socket]);

  const send = useCallback(
    (event: string, data: unknown) => {
      if (!socket) {
        return;
      }

      socket.emit(event, {
        canvasId,
        data,
      });
    },
    [canvasId, socket]
  );

  return {
    socket,
    send,
  };
}

export default useSocket;
