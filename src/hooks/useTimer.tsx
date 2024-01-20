import { useState } from "react";
import { GCTimer, updateTimerById } from "../storages/TimerStorage";

const useTimer = (gcTimer: GCTimer) => {
  const [name, setName] = useState(gcTimer.name);

  const [editingName, setEditingName] = useState(
    gcTimer.name == "-" || !gcTimer.name ? true : false
  );

  const updateName = (value: string) => {
    setName(value);
    updateTimerById(gcTimer.id, "name", value as never);
  };

  return {
    name,
    setName: updateName,
    editingName,
    setEditingName,
  };
};

export default useTimer;
