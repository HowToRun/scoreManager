import React, {Component} from 'react';
import {currentUser,hostUrl} from '../../../utils/utils'
import {axiosGetJson} from '../../common/axiosUtils'
import {info} from '../../../utils/utils'
import '../../config/config'
import userStore from '../../mobx';

export default class LogoutComponent extends Component {

    componentDidMount(){
        console.log(userStore.userName)
        axiosGetJson.get(hostUrl+'/user/loginOut?loginId='+userStore.userName).then((res)=>{
            console.log(res)
            if(res.data.code==='000000'){
                info('退出成功',res.data.message,()=>{window.location.href='/'})
            }else {
                info('请求错误',res.data.message,()=>{})
            }
        })
    }

    render() {
        return (
            <div className="loginDiv">
            </div>
        );
    }
}