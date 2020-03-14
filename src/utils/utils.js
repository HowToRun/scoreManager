import {Modal} from 'antd';
import React from 'react';

function check_cookie_name(name)
{
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
        console.log(match[2]);
    }
    else{
        console.log('--something went wrong---');
    }
}
const currentUser={
    loginId:''
};

function setCurrentUser(user) {
    currentUser.loginId=user;
}

const info= (title,msg,onOk=()=>{})=>{
    Modal.info({
        title: title,
        content: (
            <div>
                <p>{msg}</p>
            </div>
        ),
        onOk
    })
}

const hostUrl='http://localhost:8099'
export {check_cookie_name,currentUser,setCurrentUser,hostUrl,info}