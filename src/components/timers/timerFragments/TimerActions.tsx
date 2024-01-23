import { CardActions, IconButton, Tooltip } from "@mui/material";
import { FC, useContext } from "react";
import PlayArrow from "@mui/icons-material/PlayArrow";
import Pause from "@mui/icons-material/Pause";
import Refresh from "@mui/icons-material/Refresh";
import { TimerContext } from "../../../contexts/TimerContext";
import { updateTimerData } from "../../../storages/TimerStorage";

const TimerActions: FC = () => {
  const { _, $ } = useTimerActions();
  return (
    <CardActions>
      <Tooltip title={_.isPlay ? "Pause" : "Start"}>
        <IconButton onClick={$.togglePlay}>
          {_.isPlay ? <Pause></Pause> : <PlayArrow></PlayArrow>}
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
    };
    const now = Date.now();
    if (newGcTimer.isPlay) {
      newGcTimer.lastStartAt = now;
    } else {
      newGcTimer.totalTimeSpent += now - newGcTimer.lastStartAt;
    }
    set(newGcTimer);
    updateTimerData(newGcTimer);
  };

  const restartTimer = () => {
    const newTimer = {
      ...state,
      totalTimeSpent: 0,
      isPlay: false,
      lastStartAt: Date.now(),
    };
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
