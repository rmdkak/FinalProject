import {
  createContext,
  Fragment,
  type PropsWithChildren,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const OverlayContext = createContext<{
  mount: (id: string, element: ReactNode) => void;
  unmount: (id: string) => void;
} | null>(null);

export const OverlayProvider = ({ children }: PropsWithChildren) => {
  const [overlays, setOverlays] = useState<Map<string, ReactNode>>(new Map());

  const mount = useCallback((id: string, element: ReactNode) => {
    setOverlays((_overlays) => {
      const overlays = new Map(_overlays);
      overlays.set(id, element);

      return overlays;
    });
  }, []);

  const unmount = useCallback((id: string) => {
    setOverlays((_overlays) => {
      const overlays = new Map(_overlays);
      overlays.delete(id);

      return overlays;
    });
  }, []);

  const values = useMemo(
    () => ({
      mount,
      unmount,
    }),
    [mount, unmount],
  );

  return (
    <OverlayContext.Provider value={values}>
      {children}
      {[...overlays.entries()].map(([id, element]) => (
        <Fragment key={id}>{element}</Fragment>
      ))}
    </OverlayContext.Provider>
  );
};

export const useOverlayContext = () => {
  const overlayContext = useContext(OverlayContext);

  if (overlayContext === null) {
    throw new Error("useOverlayContext is only available within OverlayProvider");
  }

  return overlayContext;
};
