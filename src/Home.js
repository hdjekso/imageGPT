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
      backgroundColor:'#99C0FB',
      alignItems: 'center',
      width:'100vw',
      height:'100vh'
    }}>
      
      <Button 
        onClick={handleNewQ}
        variant='solid'
        sx={{
          marginTop:'40px',
          fontSize:'15px',
          backgroundColor: '#26487A',
          fontWeight: 'bold',
          color: 'white',
          border: '2px solid #26487A',
          '&:hover':{
            border: '2px solid #26487A',
            backgroundColor: 'white',
            color: '#26487A',
            cursor:'default'
          }
        }}>
        Start a new question
      </Button>

      <Typography 
        fontSize={'20px'}
        fontWeight={'bold'}
        color={'black'}
        marginBottom={'20px'}
        marginTop={'40px'}>
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
