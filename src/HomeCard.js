//Display old chats in Home
import {Card, CardContent, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';

const HomeCard = ({msgID}) => {
	//console.log("message ID: " + msgID);
	var token = localStorage.getItem("token");
	const navigate = useNavigate();
	const [convo, setConvo] = useState([]);
	const [isRetrieved, setIsRetrieved] = useState(false);

	useEffect( () => {
			if (isRetrieved){
					console.log(localStorage.getItem("convo"));
			}else{
					console.log("retrieval not done");
			}
	}, []);

	//retrieve specified convo from db using convo_id (key)
	const fetchData = async () => {
		let obj = {}
		obj["conversation_token"] = msgID;
		let myJSON = JSON.stringify(obj);
		//const apiURL = 'http://127.0.0.1:5000/dialogues/retrieve/all/';
		const local_token = token;
		//console.log("concatenated url: " + `http://127.0.0.1:5000/dialogues/retrieve/all/${local_token}/${msgID}`);
		fetch(`http://127.0.0.1:5000/dialogues/retrieve/all/${local_token}`, {
				method: 'POST',
				body: myJSON,
				headers: {
				'Content-type': 'application/json; charset=UTF-8'
				}
			})
			.then(response => response.json())
			.then(data => {
				console.log("raw convo data retrieved: " + data);
				localStorage.setItem("convo", data);
				setConvo(data);
				setIsRetrieved(true);

			})
			.catch(error => {
				console.error('Error occurred while fetching data:', error);
			});
	};
	
	const handleOldQ = () =>{
			fetchData();
			navigate("/Chat");
    }
    if (msgID !== ''){
        return ( 
            <Card 
            variant="outlined" 
            onClick={handleOldQ} 
            sx={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                width:'80%',
                borderRadius:'30px',
                '&:hover': {
                    boxShadow:'20px',
                    borderColor: 'black'
                }
            }}>
                <CardContent>
                <Typography
                 fontSize={'20px'}
                 fontWeight={'550'}>
                    {msgID}
                </Typography>
                </CardContent>
            </Card>
        );
    }else{
        return;
    }
    
}
 
export default HomeCard;