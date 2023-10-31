// GlobalStore.js
'use client';
import React, { createContext, useReducer } from 'react';

import { initialUserState } from '@/types/User';

// Initial state for your global store
// Create the context
export const UserContext = createContext();

// Create a provider component that will wrap your entire app
export const UserProvider = ({ children }) => {
  // Define your reducer function here
  // It should handle various actions to update the state
  // Example:
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_USER':
        return { ...state, user: action.payload };
      case 'TOGGLE_THEME':
        return { ...state, theme: action.payload };
      // Add more cases for other actions as needed
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialUserState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
