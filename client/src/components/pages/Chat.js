// Imported Modules
import React, { useEffect, useState } from 'react';
import { ChatEngine } from 'react-chat-engine';
import { connect } from 'react-redux';
import axios from 'axios';

// Imported Components
import ChatFeed from '../ChatFeed';

// Imported CSS
import '../css/Chat.css';

function Chat(props) {
    const [values, setValues ] = useState({
        uwi_email: ''
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
                res => { 
                    console.log('Chat page data pulled.')
                    setValues({
                        'uwi_email': res.data.uwi_email
                    });
                },
            )
            .catch(err => console.log(err));
    }

    useEffect(() => {
        loadUser();
    }, []);

    if(values.uwi_email === '') {
        return (
        <div></div>
        );
    }
    else {
        return (
                <ChatEngine
                    height='90vh'
                    userName={values.uwi_email}
                    userSecret='dcitConnect'
                    projectID='b8359b3b-6fff-4134-8a19-277b38c77e07'
                    renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps}/>}
                />
        );
    }

	
}

const mapStateToProps = state => ({
    auth: state.auth
});
  
export default connect(
    mapStateToProps,
)(Chat);