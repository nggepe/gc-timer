import { Box, Card, CardContent, IconButton, Tooltip } from "@mui/material";
import { FCProps, _FC } from "../../types/common";
import { GCTimer } from "../../storages/TimerStorage";
import useTimer from "../../hooks/useTimer";
import TimerNameSwitcher from "./TimerNameSwitcher";
import CloseIcon from "@mui/icons-material/Close";

interface TimerProps extends FCProps {
  gcTimer: GCTimer;
  onDelete: (id: number) => void;
}

const Timer: _FC<TimerProps> = ({ gcTimer, onDelete }) => {
  const { name, editingName, setName, setEditingName } = useTimer(gcTimer);
  return (
    <Card sx={{ display: "block", width: "100%" }}>
      <CardContent>
        <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
          <TimerNameSwitcher
            editing={editingName}
            name={name}
            onSwitch={setEditingName}
            onChange={setName}
          />

          <Tooltip title="Delete">
            <IconButton onClick={() => onDelete(gcTimer.id)}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {gcTimer.milliSeconds}
      </CardContent>
    </Card>
  );
};

export default Timer;
