import React, { useEffect, useState } from 'react';
import { ChatEngine } from 'react-chat-engine';
import { connect } from 'react-redux';
import axios from 'axios';

import ChatFeed from '../ChatFeed';

import '../css/Chat.css';

function Chat(props) {
    const authObject = { 'Project-ID': 'b8359b3b-6fff-4134-8a19-277b38c77e07', 'User-Name': 'username', 'User-Secret': 'password' }

    const [values, setValues ] = useState({
        first_name: '',
        last_name: ''
    });

    function loadUser() {
        const token = props.auth.token;
        
        const config = {
            headers: {}
        };

        if (token) {
            config.headers["x-auth-token"] = token;
        }
        axios
            .get(
                "/users/user",
                config
            )
            .then(
                res => { console.log(res.data)
                    setValues({
                        ...values,
                        ['first_name']: res.data.first_name,
                        ['last_name']: res.data.last_name
                    });
                },
            )
            .catch(err => console.log(err));
    }

    useEffect(() => {
        loadUser();
    }, []);

	return (
		<ChatEngine
			height='90vh'
			userName='dcitConnect'
			userSecret='fYpwak-punvag-rervy4'
			projectID='b8359b3b-6fff-4134-8a19-277b38c77e07'
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps}/>}
		/>
	);
}

const mapStateToProps = state => ({
    auth: state.auth
});
  
export default connect(
    mapStateToProps,
)(Chat);