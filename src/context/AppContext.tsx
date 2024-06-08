import React, { createContext, useReducer, Dispatch, ReactNode } from 'react';

// Define action types
type Action =
  | { type: 'ADD_RECORD'; payload: Record<string, any> }
  | { type: 'UPDATE_RECORD'; payload: Record<string, any> }
  | { type: 'DELETE_RECORD'; payload: number }
  | { type: 'SET_RECORDS'; payload: Record<string, any>[] }
  | { type: 'SET_EDITING_RECORD'; payload: Record<string, any> | undefined };

// Define state type
interface State {
  records: Record<string, any>[];
  editingRecord: Record<string, any> | undefined;
}

// Initial state
const initialState: State = {
  records: [],
  editingRecord: undefined,
};

// Create context
const AppContext = createContext<{ state: State; dispatch: Dispatch<Action> }>({
  state: initialState,
  dispatch: () => null,
});

// Reducer function
const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_RECORD':
      return { ...state, records: [...state.records, action.payload] };
    case 'UPDATE_RECORD':
      return {
        ...state,
        records: state.records.map((record) =>
          record.id === action.payload.id ? action.payload : record
        ),
      };
    case 'DELETE_RECORD':
      return {
        ...state,
        records: state.records.filter((record) => record.id !== action.payload),
      };
    case 'SET_RECORDS':
      return { ...state, records: action.payload };
    case 'SET_EDITING_RECORD':
      return { ...state, editingRecord: action.payload };
    default:
      return state;
  }
};

// Provider component
const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
