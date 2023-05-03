//Display old chats in Home
import {Card, CardContent, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CardHome = () => {
    const navigate = useNavigate();
    const handleOldQ = () =>{
        navigate("/Chat");
    }
    return ( 
        <Card 
        variant="outlined" 
        onClick={handleOldQ} 
        sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            width:'80%',
            '&:hover': {
                boxShadow:'20px',
                borderColor: 'black'
            }
        }}>
            <CardContent>
            <Typography>
                Old Chat
            </Typography>
            </CardContent>
        </Card>
    );
}
 
export default CardHome;