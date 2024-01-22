import { CardActions, IconButton, Tooltip } from "@mui/material";
import { FC, useContext } from "react";
import PlayArrow from "@mui/icons-material/PlayArrow";
import Stop from "@mui/icons-material/Stop";
import Refresh from "@mui/icons-material/Refresh";
import { TimerContext } from "../../../contexts/TimerContext";
import { GCTimer, updateTimerData } from "../../../storages/TimerStorage";

const TimerActions: FC = () => {
  const { _, $ } = useTimerActions();
  return (
    <CardActions>
      <Tooltip title={_.isPlay ? "Stop" : "Start"}>
        <IconButton onClick={$.togglePlay}>
          {_.isPlay ? <Stop></Stop> : <PlayArrow></PlayArrow>}
        </IconButton>
      </Tooltip>
      <Tooltip title="Restart timer">
        <IconButton onClick={$.restartTimer}>
          <Refresh />
        </IconButton>
      </Tooltip>
    </CardActions>
  );
};

export default TimerActions;

const useTimerActions = () => {
  const { state, set } = useContext(TimerContext);

  const togglePlay = () => {
    const newGcTimer = {
      ...state,
      isPlay: !state.isPlay,
      lastStartAt: Date.now(),
    };
    set(newGcTimer);
    updateTimerData(newGcTimer);
  };

  const restartTimer = () => {
    const newTimer: GCTimer = { ...state, totalTimeSpent: 0, isPlay: false };
    set(newTimer);
    updateTimerData(newTimer);
  };

  return {
    _: {
      isPlay: state.isPlay,
    },
    $: {
      togglePlay,
      restartTimer,
    },
  };
};
