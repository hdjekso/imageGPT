//Display old chats in Home
import { Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./HomeCard.scss"

const HomeCard = ({ msgID }) => {
	var token = localStorage.getItem("token");
	const [title, setTitle] = useState('loading...');
	const navigate = useNavigate();
	//const [convo, setConvo] = useState([]);
	const [isRetrieved, setIsRetrieved] = useState(false);

	useEffect(() => {
		if (isRetrieved) {
			console.log(localStorage.getItem("convo"));
		} else {
			console.log("retrieval not done");
		}
	}, []);

	useEffect(() => {
		if (msgID !== "loading...") {
			const rawtitle = msgID["first_dialogue"][0].content;
			const capitalized = rawtitle.charAt(0).toUpperCase() + rawtitle.slice(1);
			console.log(capitalized)
			setTitle(capitalized);
		}
	}, [msgID]);

	//retrieve specified convo from db using convo_id (key)
	const fetchData = async () => {
		const local_token = token;
		//console.log(`http://127.0.0.1:5000/dialogues/retrieve/all/${local_token}/${msgID}`)
		fetch(`http://127.0.0.1:5000/dialogues/retrieve/all/${local_token}/${msgID["conversation_token"]}`)
			.then(response => response.json())
			.then(data => {
				console.log("raw convo data retrieved: " + JSON.stringify(data));
				localStorage.setItem("convo", JSON.stringify(data));
				localStorage.setItem("convoID", msgID["conversation_token"]);
				//setConvo(data);
				setIsRetrieved(true);
				setTimeout(() => {
					navigate("/Chat");
				}, 0);

			})
			.catch(error => {
				console.error('Error occurred while fetching data:', error);
			});
	};

	const handleOldQ = async () => {
		await fetchData();
		//navigate("/Chat");
	}


	if (msgID["conversation_token"] !== '') {
		return (

			<div
				className="card"
				role="button"
				onClick={handleOldQ}
				tabIndex="0"
			>
				<div className="card-content">
					{/* {title} */}
					<h1>Hey</h1>
				</div>

			</div>


		);
	}

	return;


}

export default HomeCard;