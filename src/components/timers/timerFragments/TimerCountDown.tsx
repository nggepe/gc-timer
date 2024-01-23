import { FC, useContext, useEffect, useMemo, useState } from "react";
import { TimerContext } from "../../../contexts/TimerContext";
import {
  Box,
  Button,
  LinearProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { milliSecondsToTimer } from "../../../helpers/utils";
import TIME_MOVE from "../../../constants/TIME_MOVE";

const TimerCountDown: FC = () => {
  const { _ } = useTimerCountDown();
  return (
    <Tooltip title="Countdown timer">
      <Button className="btn-block btn-text btn-no-padding">
        <Box display={"flex"} gap={"1rem"}>
          <Typography fontSize={"32px"}>{_.distanceConvert.h}h</Typography>
          <Typography fontSize={"32px"}>{_.distanceConvert.m}m</Typography>
          <Typography fontSize={"32px"}>{_.distanceConvert.s}s</Typography>
          <Typography fontSize={"32px"}>{_.distanceConvert.ms}ms</Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={((_.totalTime - _.distance) / _.totalTime) * 100}
        ></LinearProgress>
      </Button>
    </Tooltip>
  );
};

export default TimerCountDown;

const useTimerCountDown = () => {
  const { state } = useContext(TimerContext);

  const [distance, setDistance] = useState(
    state.totalTime - state.totalTimeSpent - (Date.now() - state.lastStartAt)
  );

  const distanceConvert = useMemo(() => {
    return milliSecondsToTimer(distance);
  }, [distance]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (state.isPlay)
      intervalId = setInterval(() => {
        const ds =
          state.totalTime -
          state.totalTimeSpent -
          (Date.now() - state.lastStartAt);
        if (ds <= 0) {
          setDistance(0);
          clearInterval(intervalId!);
          return;
        }
        setDistance(ds);
      }, TIME_MOVE);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [state.isPlay, state.totalTime, state.totalTimeSpent, state.lastStartAt]);

  useEffect(() => {
    let distance = state.totalTime - state.totalTimeSpent;
    if (state.isPlay) {
      distance =
        state.totalTime -
        state.totalTimeSpent -
        (Date.now() - state.lastStartAt);
    }
    if (distance <= 0) {
      setDistance(0);
      return () => {};
    }
    setDistance(distance);
  }, [state.totalTime, state.totalTimeSpent, state.lastStartAt, state.isPlay]);

  return {
    _: {
      timer: state.isPlay,
      distance,
      distanceConvert,
      totalTime: state.totalTime,
      totalTimeSpent: state.totalTimeSpent,
    },
  };
};
