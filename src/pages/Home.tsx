import { Box, Typography } from "@mui/material";
import BaseLayout from "../layouts/BaseLayout";
import { _FC } from "../types/common";
import Timers from "../components/timers/Timers";
import { useEffect } from "react";

const Home: _FC = () => {
  useEffect(() => {
    document.getElementById(
      "google-ads"
    )!.innerHTML = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2693207086553957"
    crossorigin="anonymous"></script>`;
  }, []);
  return (
    <BaseLayout>
      <Box sx={{ display: "block", width: "100%" }}>
        <Typography variant="h1">Multiple Timer</Typography>
      </Box>
      <Timers />
      <div id="google-ads"></div>
    </BaseLayout>
  );
};

export default Home;
