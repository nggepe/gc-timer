import { TextField, TextFieldProps, TextFieldVariants } from "@mui/material";
import { FC, useState } from "react";

const BlurredTextField: FC<
  Omit<TextFieldProps<TextFieldVariants>, "onChange"> & {
    value: string;
    onChange?: (value: string) => void;
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
        setState(e.target.value);
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
