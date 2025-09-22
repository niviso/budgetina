import React, { useState, useContext } from "react";

interface RouterState {
  path: string;
  history: string[];
}

interface RouterContextType {
  state: RouterState;
  goTo: (path: string) => void;
  getHistory: () => string[];
  clearHistory: () => void;
  goBack: () => void;
}

const RouterContext = React.createContext<RouterContextType>({
  state: { path: "Home", history: [] },
  goTo: () => { },
  getHistory: () => [],
  clearHistory: () => { },
  goBack: () => { },
});

interface RouterProps {
  children: React.ReactNode;
}

const RouterProvider = (props: RouterProps) => {
  const [state, setState] = useState<RouterState>({
    path: "Home",
    history: [],
  });

  function goTo(path: string) {
    if (state.path !== path) {
      setState({
        path: path,
        history: [state.path, ...state.history],
      });
    }
  }

  function getHistory() {
    return state.history;
  }

  function clearHistory() {
    setState({
      path: state.path,
      history: [],
    });
  }

  function goBack() {
    const newIndex = state.history.length - 1;
    if (newIndex >= 0) {
      setState({
        path: state.history[0],
        history: state.history.slice(1),
      });
    }
  }

  const value = {
    state,
    goTo,
    getHistory,
    clearHistory,
    goBack,
  };

  return (
    <RouterContext.Provider value={value}>
      {props.children}
    </RouterContext.Provider>
  );
};


export const useRouter = () => useContext(RouterContext);

export { RouterContext, RouterProvider };
