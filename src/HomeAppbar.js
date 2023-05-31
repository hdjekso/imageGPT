import {AppBar, Box, Toolbar, Typography, Link} from '@mui/material';
import { useNavigate } from "react-router-dom";

const HomeAppbar = () => {
  var token = localStorage.getItem("token");
  //Sign out function
  const navigate = useNavigate();
  const handleSignOut = ()=>{
      let signObj = {}
      signObj["token"] = token;
      let myJSON = JSON.stringify(signObj);
      
      //make a post request to disable the session ID/ token
      fetch('http://127.0.0.1:5000/sessions/remove', {
        method: 'POST',
        body: myJSON,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(function (response) {
        if (response.ok) {
          return { data: response.json(), status: response.status };
        }
        return Promise.reject(response);
      }).then(function (result) {
        if (result.status === 200) {
          console.log("successfully disabled token");
          localStorage.removeItem("token");
          console.log("attempting to log localstorage token after removal: " + localStorage.getItem("token"));
        } else {
          console.log("token disabling failed");
        }
  
      }).catch(function (error) {
        console.warn('Something went wrong with sign out.', error);
      });

      navigate('/');
  }
  return ( 
    <Box>
      <AppBar sx={{
        position : "sticky",
        display:'flex',
        justifyContent:'center',
        height:'80px',
        
        backgroundColor: 'rgb(38, 72, 122)'}}>
        <Toolbar sx={{
          display:'flex',
          justifyContent:'space-between'
        }}>
          <Typography variant='h5'>
            <Box sx={{ fontWeight: 'bold'}}>
            ImageGPT
            </Box>
          </Typography>
          <Link onClick={handleSignOut} 
            sx={{
                textDecoration:'none',
                cursor:'pointer',
                color:'white',
                fontWeight:'bold'
            }}>
              Sign out
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
    );


}

 
export default HomeAppbar;