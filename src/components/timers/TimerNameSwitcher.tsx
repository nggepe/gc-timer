import { Box, Button, Typography } from "@mui/material";
import { FC, useEffect, useRef } from "react";
import BlurredTextField from "../inputs/BlurredTextField";

const TimerNameSwitcher: FC<{
  name: string;
  editing: boolean;
  onSwitch: (isEditing: boolean) => void;
  onChange: (name: string) => void;
}> = ({ name, editing, onSwitch, onChange }) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const onBlurredChange = (value: string) => {
    if (!value) return;
    onChange(value);
    onSwitch(false);
  };

  const switchToTrue = () => {
    onSwitch(true);
    focusToInput();
  };

  const focusToInput = () => {
    setTimeout(() => {
      if (!ref.current) return;
      ref.current.select();
    }, 100);
  };

  useEffect(() => {
    if (!name) {
      focusToInput();
    }
  }, [name]);

  if (!editing) {
    return (
      <Box
        display="block"
        width={"100%"}
        maxWidth={"100%"}
        overflow={"hidden"}
        textOverflow={"ellipsis"}
      >
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
            {name}
          </Typography>
        </Button>
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
        }}
        placeholder="Timer name"
        value={name}
        onChange={onBlurredChange}
        style={{ width: "100%" }}
      />
    </Box>
  );
};

export default TimerNameSwitcher;
