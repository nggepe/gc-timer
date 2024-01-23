import { gcTimerToMilliSeconds, milliSecondsToTimer } from "./utils";

describe("utils.test.ts", () => {
  it("test milliSecondsToTimer", () => {
    //1m
    expect(milliSecondsToTimer(1000 * 60).m).toBe(1);

    //1m 2s
    const min1sec2 = milliSecondsToTimer(1000 * 60 + 2000);
    expect(min1sec2.m).toBe(1);
    expect(min1sec2.s).toBe(2);

    //1m 2s 3ms
    const min1sec2ms300 = milliSecondsToTimer(1000 * 60 + 2000 + 300);
    expect(min1sec2ms300.m).toBe(1);
    expect(min1sec2ms300.s).toBe(2);
    expect(min1sec2ms300.ms).toBe(300);

    // 1h 2m 3s 400ms
    const h1m2s3ms400 = milliSecondsToTimer(
      1000 * 60 * 60 + 2000 * 60 + 3000 + 400
    );
    expect(h1m2s3ms400.h).toBe(1);
    expect(h1m2s3ms400.m).toBe(2);
    expect(h1m2s3ms400.s).toBe(3);
    expect(h1m2s3ms400.ms).toBe(400);
  });

  it("test gcTimerToMilliSeconds", () => {
    expect(gcTimerToMilliSeconds("1s")).toBe(1000);
    expect(gcTimerToMilliSeconds("1m")).toBe(1000 * 60);
    expect(gcTimerToMilliSeconds("1h")).toBe(1000 * 60 * 60);
    expect(gcTimerToMilliSeconds("1h 1m 1s")).toBe(
      1000 * 60 * 60 + 1000 * 60 + 1000
    );
  });
});
