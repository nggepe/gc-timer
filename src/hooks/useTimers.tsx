import { useState } from "react";
import {
  GCTimer,
  addTimer,
  canAddTimer,
  deleteTimerById,
  getTimers,
} from "../storages/TimerStorage";

const useTimers = () => {
  const [state, setState] = useState(getTimers());

  const add = () => {
    const newTimer: GCTimer = {
      milliSeconds: 0,
      milliSecondsSpent: 0,
      name: "",
      isStart: false,
      editing: true,
      id: Date.now(),
      lastStartAt: Date.now(),
    };
    if (canAddTimer()) {
      setState(addTimer(newTimer));
    }
  };

  const deleteById = (id: number) => {
    setState(deleteTimerById(id));
  };

  return { state, add, deleteById };
};

export default useTimers;
