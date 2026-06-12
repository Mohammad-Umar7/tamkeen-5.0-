import { createContext, useContext, useReducer, useRef, useCallback } from "react";
import { QUEUE, WORKSPACE } from "../data/seed";

const AppCtx = createContext(null);

const initialState = {
  role: "student",
  pending: QUEUE.pending,
  queue: QUEUE.items,
  thread: WORKSPACE.chatSeed,
  toasts: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "role/set":
      return { ...state, role: action.role };

    case "toast/add":
      return { ...state, toasts: [...state.toasts, action.toast] };
    case "toast/remove":
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.id) };

    case "queue/approve":
    case "queue/reject":
      return {
        ...state,
        queue: state.queue.filter((q) => q.id !== action.id),
        pending: Math.max(0, state.pending - 1),
      };

    case "queue/edit":
      return {
        ...state,
        queue: state.queue.map((q) => (q.id === action.id ? { ...q, title: action.title } : q)),
      };

    case "tutor/message":
      return { ...state, thread: [...state.thread, action.message] };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const idRef = useRef(0);

  const toast = useCallback((message, tone = "navy") => {
    const id = ++idRef.current;
    dispatch({ type: "toast/add", toast: { id, message, tone } });
    setTimeout(() => dispatch({ type: "toast/remove", id }), 3600);
  }, []);

  return <AppCtx.Provider value={{ state, dispatch, toast }}>{children}</AppCtx.Provider>;
}

export function useApp() {
  return useContext(AppCtx);
}
