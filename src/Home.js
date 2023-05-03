import { Button, Grid, Typography, Stack} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CardHome from "./CardHome";

function Home_() {
  const navigate = useNavigate();

  const handleNewQ = () => {
    navigate("/Chat");
  }


  return (
    <Grid sx={{
      display:'flex',
      flexDirection:'column',
      justifyContent: 'center',
      alignItems: 'center',
      width:'100%'
    }}>
      
      <Button 
        onClick={handleNewQ}
        variant='outlined'
        sx={{
          margin:'20px',
          fontSize:'15px',
          '&:hover':{
            boxShadow:'20px',
            borderColor: 'primary',
            backgroundColor: 'none',
            cursor:'default'
          }
        }}>
        Start a new question
      </Button>

      <Typography fontSize={'20px'} >
        Previous chat
      </Typography>

      <Stack spacing ={2} sx={{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%'
      }}>
        <CardHome />
        <CardHome />
      </Stack>
    </Grid>

  );
}

export default Home_;
