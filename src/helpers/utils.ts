export const milliSecondsToTimer = (milliSeconds: number) => {
  const h = Math.floor(milliSeconds / 60 / 60 / 1000);
  const m = Math.floor((milliSeconds % (60 * 60 * 1000)) / 60 / 1000);
  const s = Math.floor((milliSeconds % (60 * 1000)) / 1000);
  const ms = milliSeconds % 1000;

  return { h, m, s, ms };
};

/**this method is convert from "`BlurredTextfield` with format `gc-timer`" to milliSecond  */
export const gcTimerToMilliSeconds = (value: string) => {
  const values = value.trim().split(" ");
  let ms = 0;
  const unit = gcTimerUnit();
  for (const v of values) {
    const unitTimer = convertToUnitTimer(v);

    ms += unit[unitTimer.type as keyof GCTimerUnit] * unitTimer.num;
  }

  return ms;
};

const convertToUnitTimer = (value: string) => {
  const type = value.replace(/\d+/gi, "").substring(0, 1);
  const num = parseInt(value.replace(/[a-z]/gi, ""));

  return { num, type };
};

const gcTimerUnit: () => GCTimerUnit = () => {
  return {
    d: 1000 * 60 * 60 * 24,
    h: 1000 * 60 * 60,
    m: 1000 * 60,
    s: 1000,
    ms: 1,
  };
};

export interface GCTimerUnit {
  d: number;
  h: number;
  m: number;
  s: number;
  ms: number;
}
