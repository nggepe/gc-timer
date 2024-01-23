import { Box, Button, Tooltip, Typography } from "@mui/material";
import { FC, useContext, useEffect, useRef } from "react";
import BlurredTextField from "../../inputs/BlurredTextField";
import { TimerContext } from "../../../contexts/TimerContext";
import { updateTimerData } from "../../../storages/TimerStorage";

const TimerNameEdit: FC = () => {
  const { state, set } = useContext(TimerContext);
  const ref = useRef<HTMLInputElement | null>(null);

  const onBlurredChange = (value: string) => {
    if (!value) return;
    set({ ...state, name: value, editing: false });
    updateTimerData({ ...state, name: value, editing: false });
  };

  const switchToTrue = () => {
    set({ ...state, editing: true });
    focusToInput();
  };

  const focusToInput = () => {
    setTimeout(() => {
      if (!ref.current) return;
      ref.current.select();
    }, 100);
  };

  useEffect(() => {
    if (!state.name) {
      focusToInput();
    }
  }, [state.name]);

  if (!state.editing) {
    return (
      <Box
        display="block"
        width={"100%"}
        maxWidth={"100%"}
        overflow={"hidden"}
        textOverflow={"ellipsis"}
      >
        <Tooltip title="Name">
          <Button
            className="btn-text btn-block btn-no-padding"
            onClick={switchToTrue}
            style={{
              fontSize: "16px",
              width: "100%",
              maxWidth: "100%",
              overflowX: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Typography
              variant="inherit"
              width={"calc(100%)"}
              overflow={"hidden"}
              noWrap
              textOverflow={"ellipsis"}
            >
              {state.name}
            </Typography>
          </Button>
        </Tooltip>
      </Box>
    );
  }

  return (
    <Box display="block" width={"100%"} maxWidth={"100%"}>
      <BlurredTextField
        inputRef={ref}
        variant="standard"
        inputProps={{
          style: { fontSize: "16px", width: "100%", maxWidth: "100%" },
          "aria-label": `name-input-text-field-${state.index}`,
        }}
        placeholder="Timer name"
        value={state.name}
        onChange={onBlurredChange}
        style={{ width: "100%" }}
        aria-label={`name-text-field-${state.index}`}
      />
    </Box>
  );
};

export default TimerNameEdit;
