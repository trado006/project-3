import React from 'react';

function ChatBox(props){
    return (
        <div className="d-flex bd-highlight">
            <div className="img_cont">
                <img src="https://joeschmoe.io/api/v1/random" className="rounded-circle user_img" />
                <span className="online_icon"></span>
            </div>
            <div className="user_info">
                <span>Khalid</span>
            </div>
        </div>
    )
}