import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import useAuthStore from "../store/authStore";

// 1. Create the context
const SocketContext = createContext();

// 2. Create a custom hook to easily use the context
export const useSocketContext = () => {
  return useContext(SocketContext);
};

// 3. Create the Provider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (authUser) {
      // Connect to the backend socket server
      // const newSocket = io("http://localhost:5000", {
      const newSocket = io("https://flux-app-lovy.onrender.com", {
        // Send the userId to the server for mapping
        query: {
          userId: authUser._id,
        },
      });

      setSocket(newSocket);

      // Clean up on unmount or when authUser changes
      return () => {
        newSocket.close();
      };
    } else {
      // If no user is logged in, close any existing socket
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
