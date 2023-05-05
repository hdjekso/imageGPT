import * as React from 'react';
import { Button, Card, CardHeader, Grid, TextField, Typography } from "@mui/material";
import { useNavigate} from "react-router-dom";
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Icon from '@mui/material/Icon';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';



const drawerWidth = 240;

/*function Chat() {
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
}*/

function PermanentDrawerLeft() {
  const [previewImage, setPreviewImage] = useState(null);
  //const [uploadedImage, setUploadedImage] = useState(null);
  const [file, setFile] = useState(null);  // stores the image file
  const [imageUrl, setImageUrl] = useState(null); // stores the link to the image


  const handleSelectImage = (event) => {
    setFile(event.target.files[0]);
    const fileReader = new FileReader();
    /*fileReader.addEventListener("load", () => {
        setPreviewImage(fileReader.result);
    });*/
    fileReader.onloadend = () => {
      setPreviewImage(fileReader.result);
    }
    fileReader.readAsDataURL(event.target.files[0]);
  }

  const handleUploadImage =() => {
    const link = URL.createObjectURL(file);
    setImageUrl(link);

    /*const data = new FormData();
    data.append('files[]', previewImage);

    
    fetch(/"server url", { method: 'POST', body: data }).then(async (response) => {
        const imageResponse = await response.json();
        setUploadedImage(imageResponse);
    }).catch((err) => {

    });*/
  }

  const navigate = useNavigate();
  const menuItems = [
    {
      text: 'Home',
      icon: <HomeIcon color="primary"/>,
      path: '/home'
    },
    {
      text: "Sign Out",
      icon: <LogoutIcon color="primary" />,
      path: '/'
    }
  ]

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/*<AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            ImageGPT
          </Typography>
        </Toolbar>
      </AppBar>*/}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth + 10,
            boxSizing: 'border-box',
            bgcolor: '#d1e0ff',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <AppBar
          position="relative"
          sx={{ width: drawerWidth + 9, height: 80}}
          style={{ background: '#26487A'}}
        >
          <Toolbar>
            <Typography variant="h5" noWrap component="div">
              <Box sx={{ fontWeight: 'bold', mt: 1.5}}>ImageGPT</Box>
            </Typography>
          </Toolbar>
      </AppBar>

        {/*output list items */}
        <List>
          {menuItems.map(item => (
            <ListItem button divider
            key={item.text}
            sx={{height: 60, p: 3, mb: 1.5}}
            onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text}/> 
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        height="100vh"
        sx={{ flexGrow: 1, bgcolor: '#e9ecf5', p: 3}}
      >
        <Toolbar />
        <Grid container spacing ={2} justifyContent="center" direction="column"  alignItems="center">
          <Grid item md={12}>
            {!imageUrl && <input type="file" onChange={handleSelectImage}/>}
          </Grid>
          <Grid item>
            {previewImage && <img style = {{display: "block", minWidth: '40em', maxWidth: '40%', marginLeft: 'auto', marginRight: 'auto'}} src={previewImage} alt="uploaded" />}
          </Grid>
          <Grid item>
          {previewImage && <button onClick={handleUploadImage}>Upload</button>}
          </Grid>
        </Grid>
        <Typography paragraph mt={3}>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
  );
}

//export default Chat;
export default PermanentDrawerLeft;
