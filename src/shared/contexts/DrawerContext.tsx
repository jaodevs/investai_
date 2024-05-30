import { createContext, useCallback, useContext, useState } from "react";

interface IDrawerContextData {
  DrawerOptions: IDrawerOptions[];
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
  setDrawerOptions: (newDrawerOptions: IDrawerOptions[]) => void;
}

interface IDrawerOptions {
  icon: string;
  label: string;
  path: string;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

interface IDrawerProvider {
  children: React.ReactNode;
}

export const DrawerProvider: React.FC<IDrawerProvider> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [DrawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([]);
  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen);
  }, []);

  const handleSetDrawerOptions = useCallback(
    (newDrawerOptions: IDrawerOptions[]) => {
      setDrawerOptions(newDrawerOptions);
    },
    []
  );

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        toggleDrawerOpen,
        DrawerOptions,
        setDrawerOptions: handleSetDrawerOptions,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
