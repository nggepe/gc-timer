import { _FC } from "../types/common";
import AppBarMaster from "../components/AppBarMaster";
import { Container } from "@mui/material";

const BaseLayout: _FC = (props) => {
  return (
    <AppBarMaster>
      <Container maxWidth="xl">{props.children}</Container>
    </AppBarMaster>
  );
};

export default BaseLayout;
