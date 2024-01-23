import {
  addTimer,
  canAddTimer,
  clearTimers,
  deleteTimerById,
  getTimerById,
  getTimers,
  initialTimer,
  updateTimerById,
  updateTimerData,
} from "./TimerStorage";

describe("TimerStorage.test.tsx", () => {
  beforeAll(() => {
    vi.spyOn(localStorage, "setItem");
    vi.spyOn(localStorage, "getItem");
    vi.spyOn(localStorage, "clear");
    vi.spyOn(localStorage, "removeItem");
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("test initialTimer", () => {
    const timer = initialTimer();
    expect(timer.editing).toBeTypeOf("boolean");
    expect(timer.totalTime).toBe(0);
    expect(timer.totalTimeSpent).toBe(0);
    expect(timer.id).toBeTypeOf("number");
    expect(timer.lastStartAt).toBeTypeOf("number");
    expect(timer.isPlay).toBe(false);
  });

  it("test addTimer", () => {
    expect(addTimer(initialTimer()).length).toBe(1);
    expect(addTimer(initialTimer()).length).toBe(2);
    expect(addTimer(initialTimer()).length).toBe(3);
  });

  it("test getTimers", () => {
    const timers = addTimer(initialTimer());

    expect(timers.length).toBe(getTimers().length);
  });

  it("test getTimerById", () => {
    const id = Date.now();
    addTimer({ ...initialTimer(), id: id });
    const timer = getTimerById(id);
    expect(timer).not.toBe(undefined);
  });

  it("test clearTimers", () => {
    addTimer(initialTimer());
    clearTimers();
    const timers = getTimers();
    expect(timers.length).toBe(0);
  });

  it("test deleteTimerById", () => {
    const id1 = 1;
    addTimer({ ...initialTimer(), id: id1 });
    const id2 = 3;
    addTimer({ ...initialTimer(), id: id2 });

    deleteTimerById(id1);
    expect(getTimerById(id1)).toBe(undefined);
    expect(getTimerById(id2)).not.toBe(undefined);
  });

  it("test updateTimerData & updateTimerById", () => {
    const id = 1;
    const timer = { ...initialTimer(), id: id };
    addTimer(timer);
    addTimer({ ...timer, id: 2 });
    expect(getTimerById(id)?.isPlay).toBe(false);
    updateTimerData({ ...timer, isPlay: true });
    expect(getTimerById(id)?.isPlay).toBe(true);
    updateTimerById(id, "isPlay", false as never);
    expect(getTimerById(id)?.isPlay).toBe(false);
  });

  it("test canAddTimer", () => {
    const timer = initialTimer();
    for (let index = 0; index < 20; index++) {
      addTimer({ ...timer, id: index, name: "Name" });
    }
    expect(canAddTimer()).toBe(false);
    clearTimers();
    expect(canAddTimer()).toBe(true);
    addTimer(timer);
    expect(canAddTimer()).toBe(false);
  });
});
