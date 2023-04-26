import { Button, Card, CardHeader, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Home");
  }

  return (
    <Grid>
      <Typography>
      This is the login page
    </Typography>
    <Button onClick={handleClick}>
      Sign In
    </Button>
    </Grid>
  );
}

export default Login;
