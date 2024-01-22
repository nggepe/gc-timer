import { Box, Typography } from "@mui/material";
import BaseLayout from "../layouts/BaseLayout";
import { _FC } from "../types/common";
import Timers from "../components/timers/Timers";

const Home: _FC = () => {
  return (
    <BaseLayout>
      <Box sx={{ display: "block", width: "100%" }}>
        <Typography variant="h1">Multiple Timer</Typography>
      </Box>
      <Timers />
    </BaseLayout>
  );
};

export default Home;
