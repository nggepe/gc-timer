import { Box, Card, CardContent, IconButton, Tooltip } from "@mui/material";
import { FCProps, _FC } from "../../types/common";
import { GCTimer } from "../../storages/TimerStorage";
import TimerNameEdit from "./timerFragments/TimerNameEdit";
import CloseIcon from "@mui/icons-material/Close";
import TimerTimeEdit from "./timerFragments/TimerTimeEdit";
import { TimerContextProvider } from "../../contexts/TimerContext";
import TimerActions from "./timerFragments/TimerActions";
import TimerCountDown from "./timerFragments/TimerCountDown";

interface TimerProps extends FCProps {
  gcTimer: GCTimer;
  onDelete: (id: number) => void;
}

const Timer: _FC<TimerProps> = ({ gcTimer, onDelete }) => {
  return (
    <TimerContextProvider timer={gcTimer}>
      <Card sx={{ display: "block", width: "100%" }}>
        <CardContent>
          <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
            <TimerNameEdit />

            <Tooltip title="Delete">
              <IconButton onClick={() => onDelete(gcTimer.id)}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <TimerTimeEdit />
          <TimerCountDown></TimerCountDown>
        </CardContent>
        <TimerActions></TimerActions>
      </Card>
    </TimerContextProvider>
  );
};

export default Timer;
