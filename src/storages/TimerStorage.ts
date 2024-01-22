const TIMER_KEY = "gc-timer";

export interface GCTimer {
  name: string;
  /**total times (milliseconds) */
  totalTime: number;
  totalTimeSpent: number;
  id: number;
  isPlay: boolean;
  editing: boolean;
  lastStartAt: number;
}

export const initialTimer: () => GCTimer = () => {
  return {
    totalTime: 0,
    totalTimeSpent: 0,
    name: "",
    isPlay: false,
    editing: true,
    id: Date.now(),
    lastStartAt: Date.now(),
  };
};

export const addTimer = (value: GCTimer) => {
  const timers = [...getTimers(), value];
  setTimers(timers);
  return timers;
};

export const getTimers = () => {
  const timersJson = localStorage.getItem(TIMER_KEY);
  if (!timersJson) return [];

  const timers = JSON.parse(timersJson) as GCTimer[];

  return timers;
};

export const getTimerById = (id: number) => {
  for (const timer of getTimers()) {
    if (timer.id === id) {
      return timer;
    }
  }
};

export const setTimers = (timers: GCTimer[]) => {
  localStorage.setItem(TIMER_KEY, JSON.stringify(timers));
};

export const clearTimers = () => {
  localStorage.removeItem(TIMER_KEY);
};

export const deleteTimerById = (id: number) => {
  const timers = getTimers();
  const filteredTimers = timers.filter((v) => {
    return v.id != id;
  });

  localStorage.setItem(TIMER_KEY, JSON.stringify(filteredTimers));
  return filteredTimers;
};

export const updateTimerData = (data: GCTimer) => {
  const timers = getTimers().map((e) => {
    if (e.id == data.id) {
      return data;
    }
    return e;
  });
  setTimers(timers);
  return timers;
};

export const updateTimerById = (
  id: number,
  key: keyof GCTimer,
  value: never
) => {
  const timers = getTimers().map((e) => {
    if (e.id == id) {
      return { ...e, [key]: value };
    }
    return e;
  });

  setTimers(timers);

  return timers;
};

export const canAddTimer = () => {
  const timers = getTimers();
  if (timers.length >= 20) return false;
  for (const timer of timers) {
    if (!timer.name) {
      return false;
    }
  }

  return true;
};
