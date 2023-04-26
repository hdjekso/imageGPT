import { Button, Card, CardHeader, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


function Home_() {
  const navigate = useNavigate();

  const handleNewQ = () => {
    navigate("/Chat");
  }

  return (
    <Grid>
      <Typography>
      This is the home page
    </Typography>
    <Button onClick={handleNewQ}>
      Start a new question
    </Button>
    </Grid>
  );
}

export default Home_;
