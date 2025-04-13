import {createContext} from 'react';
import { useState } from 'react';

export const socketContext = createContext("");

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState("");
    return (
      <socketContext.Provider value={{ socket, setSocket }}>
        {children}
      </socketContext.Provider>
    );
};