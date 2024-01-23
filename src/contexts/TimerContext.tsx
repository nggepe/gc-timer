import {
  Dispatch,
  FC,
  SetStateAction,
  useMemo,
  useState,
  createContext,
} from "react";
import { GCTimer, initialTimer } from "../storages/TimerStorage";

import { FCProps } from "../types/common";

export const TimerContext = createContext<{
  state: GCTimer & { index: number };
  set: Dispatch<SetStateAction<GCTimer & { index: number }>>;
}>({
  state: { ...initialTimer(), index: -1 },
  set: () => {},
});

export const TimerContextProvider: FC<
  FCProps & { timer: GCTimer & { index: number } }
> = ({ timer, children }) => {
  const [state, setState] = useState<GCTimer & { index: number }>(timer);
  const providerValue = useMemo(() => {
    return { state, set: setState };
  }, [state, setState]);
  return (
    <TimerContext.Provider value={providerValue}>
      {children}
    </TimerContext.Provider>
  );
};
