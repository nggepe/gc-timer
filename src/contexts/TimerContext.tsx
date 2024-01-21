import { Dispatch, FC, SetStateAction, useState } from "react";
import { GCTimer, initialTimer } from "../storages/TimerStorage";
import { createContext } from "react";
import { FCProps } from "../types/common";

export const TimerContext = createContext<{
  state: GCTimer;
  set: Dispatch<SetStateAction<GCTimer>>;
}>({
  state: initialTimer(),
  set: () => {},
});

export const TimerContextProvider: FC<FCProps & { timer: GCTimer }> = ({
  timer,
  children,
}) => {
  const [state, setState] = useState<GCTimer>(timer);
  return (
    <TimerContext.Provider value={{ state, set: setState }}>
      {children}
    </TimerContext.Provider>
  );
};
