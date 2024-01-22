import { FC, useContext, useEffect, useMemo } from "react";
import { TimerContext } from "../../../contexts/TimerContext";
import {
  Box,
  Button,
  LinearProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { milliSecondsToTimer } from "../../../helpers/utils";
import { getTimerById, updateTimerById } from "../../../storages/TimerStorage";
import TIME_MOVE from "../../../constants/TIME_MOVE";

const TimerCountDown: FC = () => {
  const { _ } = useTimerCountDown();
  return (
    <Tooltip title="Countdown timer">
      <Button className="btn-block btn-text btn-no-padding">
        <Box display={"flex"} gap={"1rem"}>
          <Typography fontSize={"32px"}>{_.distance.h}h</Typography>
          <Typography fontSize={"32px"}>{_.distance.m}m</Typography>
          <Typography fontSize={"32px"}>{_.distance.s}s</Typography>
          <Typography fontSize={"32px"}>{_.distance.ms}ms</Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={(_.totalTimeSpent / _.totalTime) * 100}
        ></LinearProgress>
      </Button>
    </Tooltip>
  );
};

export default TimerCountDown;

const useTimerCountDown = () => {
  const { state, set } = useContext(TimerContext);

  const distance = useMemo(() => {
    return milliSecondsToTimer(state.totalTime - state.totalTimeSpent);
  }, [state.totalTime, state.totalTimeSpent]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (state.isPlay)
      intervalId = setInterval(() => {
        const timer = getTimerById(state.id);
        if (!timer) {
          return clearInterval(intervalId!);
        }
        const spent = timer.totalTimeSpent + TIME_MOVE;
        updateTimerById(state.id, "totalTimeSpent", spent as never);

        set({
          ...timer,
          totalTimeSpent: spent as never,
        });

        if (timer.totalTime - spent <= 0) {
          clearInterval(intervalId!);
          timer.totalTimeSpent = timer.totalTime;
          timer.isPlay = false;
          updateTimerById(timer.id, "totalTimeSpent", timer.totalTime as never);
          set(timer);
        }
      }, TIME_MOVE);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [state.isPlay, state.id, set]);

  return {
    _: {
      timer: state.isPlay,
      distance,
      totalTime: state.totalTime,
      totalTimeSpent: state.totalTimeSpent,
    },
  };
};
