import { FC, useContext, useMemo, useRef, useState } from "react";
import {
  milliSecondsToTimer,
  gcTimerToMilliSeconds,
} from "../../../helpers/utils";
import { Box, Button, Tooltip } from "@mui/material";
import BlurredTextField from "../../inputs/BlurredTextField";
import { TimerContext } from "../../../contexts/TimerContext";
import { updateTimerData } from "../../../storages/TimerStorage";

const TimerTimeEdit: FC = () => {
  const { _, $ } = useTimerTimeEdit();

  return (
    <div>
      {_.editing ? (
        <Box display={"flex"} gap={"1rem"}>
          <BlurredTextField
            variant="standard"
            value={`${_.time.h}h ${_.time.m}m ${_.time.s}s`}
            type="text"
            label="Total time"
            helperText="You can format the time as follows: 2h 3m 5s, which means 2 hours, 3 minutes, and 5 seconds"
            inputRef={_.ref}
            onChange={$.changeTotalTime}
            format="gc-timer"
            inputProps={{
              "aria-label": `text-field-edit-timer-${_.index}`,
            }}
          />
        </Box>
      ) : (
        <Tooltip title="Setup timer">
          <Button
            className="btn-block btn-text btn-no-padding"
            onClick={$.toggleEditing}
            aria-label={`button-edit-timer-${_.index}`}
          >
            <Box display={"flex"} gap={"1rem"}>
              <Box display={"block"}>{_.time.h}h</Box>
              <Box display={"block"}>{_.time.m}m</Box>
              <Box display={"block"}>{_.time.s}s</Box>
            </Box>
          </Button>
        </Tooltip>
      )}
    </div>
  );
};

export default TimerTimeEdit;

const useTimerTimeEdit = () => {
  const ref = useRef<HTMLInputElement | null>(null);
  const { state, set } = useContext(TimerContext);
  const [editing, setEditing] = useState(false);

  const totalTime = useMemo(() => {
    return milliSecondsToTimer(state.totalTime);
  }, [state.totalTime]);

  const toggleEditing = () => {
    const newEditing = !editing;

    setEditing(newEditing);

    if (newEditing) {
      setTimeout(() => {
        ref.current?.select();
      }, 50);
    }
  };

  const changeTotalTime = (value: string) => {
    const totalTime = gcTimerToMilliSeconds(value);
    const newValue = { ...state, totalTime: totalTime };
    set(newValue);
    updateTimerData(newValue);
    setEditing(false);
  };

  return {
    /**variables */
    _: {
      time: totalTime,
      editing,
      ref,
      index: state.index,
    },
    /**function */
    $: {
      toggleEditing,
      changeTotalTime,
    },
  };
};
