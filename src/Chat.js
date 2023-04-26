import { Button, Card, CardHeader, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Chat() {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/home");
  }

  const handleSignOut = () => {
    navigate("/");
  }

  return (
    <Grid>
      <Typography>
      This is the conversations page
    </Typography>
    <Button onClick={handleHome}>
      Home
    </Button>
    <Button onClick={handleSignOut}>
      Sign Out
    </Button>
    </Grid>
  );
}

export default Chat;
