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
import  Avatar  from '@mui/material/Avatar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import "./Chat.css"
import { Cloud } from '@mui/icons-material';


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

function Chat() {
  const [previewImage, setPreviewImage] = useState(null);
  //const [uploadedImage, setUploadedImage] = useState(null);
  const [file, setFile] = useState(null);  // stores the image file
  const [imageUrl, setImageUrl] = useState(null); // stores the link to the image
  const [imageWidth, setImageWidth] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const handleSelectImage = (event) => {
    setFile(event.target.files[0]);
    const fileReader = new FileReader();
    /*fileReader.addEventListener("load", () => {
        setPreviewImage(fileReader.result);
    });*/
    fileReader.onloadend = () => {
      setPreviewImage(fileReader.result);
      /*setImageWidth(fileReader.result.width);
      console.log(fileReader.result.width);*/
    }
    fileReader.readAsDataURL(event.target.files[0]);
  }

  const handleRemoveImg = () => {
    setPreviewImage(null);
  }

  const handleUploadImage = () => {
    const link = URL.createObjectURL(file);
    setUploaded(1);
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
          <Grid item>
          {!previewImage && <Card sx={{
            backgroundColor: "#4175ce",
            height: 200,
            width: '70vw',
          }}>
            <Box sx={{display: 'flex', justifyContent: 'center', p: 2, mt: 2}}>
              <CloudUploadIcon style={{ fontSize: 55 }}/>
            </Box>
            <label className="custom-file-select">
              {!imageUrl && <input type="file" onChange={handleSelectImage}/>}
              Choose File
            </label>
          </Card>}
          </Grid>
          {previewImage && <Grid item md={4} xs={12} sx={{
          }}>
              <Button>Convert to Text</Button>
          </Grid>}
          <Grid item>
            {previewImage && <img className='preview-image' src={previewImage} alt="uploaded" />}
          </Grid>
          <Grid item  mb={5}>
            {previewImage && <Button sx={{marginRight: '12.3vw',}} disabled={uploaded} onClick={handleRemoveImg}>Remove</Button>}
            {previewImage && !uploaded && <Button sx={{marginLeft: '12.3vw',}} disabled={uploaded} onClick={handleUploadImage}>Upload</Button>}
            {uploaded ? <Button sx={{marginLeft: '9vw',}} disabled>Upload Complete</Button> : ''}
          </Grid>
        </Grid>
        
        <div className="send">
          sending out
        </div>
        <div className="receive">
          <div className="im">
            {/* <Avatar>H</Avatar> */}
          </div>
          receive
        </div>
        <div className="send">
        <Typography paragraph mt={3}>
          {/* <Avatar>H</Avatar> */}
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
        </div>
        
        {/* <Slide>Test</Slide> */}
      </Box>
    </Box>
  );
}

export default Chat;
