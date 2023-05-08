import {AppBar, Box, Toolbar, Typography, Link} from '@mui/material';
import { useNavigate } from "react-router-dom";

const HomeAppbar = () => {
    //Sign out function
    const navigate = useNavigate();
    const handleSignOut = ()=>{
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