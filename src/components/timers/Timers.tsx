import { Button, Grid, Typography } from "@mui/material";
import { _FC } from "../../types/common";
import Timer from "./Timer";
import {
  GCTimer,
  addTimer,
  canAddTimer,
  deleteTimerById,
  getTimers,
  initialTimer,
} from "../../storages/TimerStorage";
import { useState } from "react";

const Timers: _FC = () => {
  const { state, add, deleteById } = useTimers();

  return (
    <Grid container rowSpacing={2} columnSpacing={2}>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Typography marginBottom={"1rem"} marginTop={"1rem"}>
          Introducing our innovative Multiple Timer Application – a versatile
          solution for efficiently managing your time-sensitive tasks. With our
          user-friendly interface, you can effortlessly set and monitor multiple
          timers simultaneously, ensuring no deadline is missed or task
          overlooked. Boost your productivity by organizing your day with
          precision, thanks to the convenience of our Multiple Timer App. Never
          let time slip away – stay on top of your schedule effortlessly!
        </Typography>
        <Button
          color="primary"
          onClick={add}
          variant="contained"
          aria-label="add-new-timer"
        >
          Add New Timer
        </Button>
      </Grid>
      {state.map((e, i) => {
        return (
          <Grid
            key={`timer-${e.name + i}`}
            item
            xl={3}
            lg={4}
            md={6}
            sm={12}
            xs={12}
          >
            <Timer onDelete={deleteById} gcTimer={{ ...e, index: i }} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Timers;

const useTimers = () => {
  const [state, setState] = useState(getTimers());

  const add = () => {
    const newTimer: GCTimer = initialTimer();
    if (canAddTimer()) {
      setState(addTimer(newTimer));
    }
  };

  const deleteById = (id: number) => {
    setState(deleteTimerById(id));
  };

  return { state, add, deleteById };
};
