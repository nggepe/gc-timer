import { TextField, TextFieldProps, TextFieldVariants } from "@mui/material";
import { FC, useState } from "react";

const BlurredTextField: FC<
  Omit<TextFieldProps<TextFieldVariants>, "onChange"> & {
    value: string;
    onChange?: (value: string) => void;
    format?: "gc-timer" | string[];
  }
> = (props) => {
  const [state, setState] = useState(props.value);

  const callChange = () => {
    if (props.onChange) {
      props.onChange(state);
    }
  };

  return (
    <TextField
      {...props}
      onChange={(e) => {
        let value = e.target.value;
        if (props.format == "gc-timer") {
          value = value
            .toLowerCase()
            .replace(/[^0-9&^d&^h&^m&^s&^ms&^\s]/gi, "");
        }
        setState(value);
      }}
      onBlur={callChange}
      onKeyDown={(e) => {
        if (e.key == "Enter") {
          callChange();
        }
      }}
      value={state}
    />
  );
};

export default BlurredTextField;
