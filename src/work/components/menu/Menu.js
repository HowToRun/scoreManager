import React, {Component} from 'react';
import './Menu.scss'
import {hostUrl} from '../../../utils/utils';
import {axiosGetJson} from '../../common/axiosUtils';

export default class Menu extends Component {

    constructor(props){
        super(props);
        this.state = {
            onShow:false,
            isLogin:false
        }
        console.log('menu: '+this.state.onShow)
    }

    componentWillMount() {
        axiosGetJson.get(hostUrl+'/user/getSessionUser?')
            .then((res) => {
                if (res.data.code === '000000') {
                    console.log(res.data.data)
                    if (res.data.data!=null){
                        console.log('显示退出登录')
                        this.setState({
                            onShow:this.state.onShow,
                            isLogin:true
                        })
                        if (res.data.data.role===0){

                            this.setState({
                                onShow:true,
                                isLogin:true
                            })
                        }
                    }
                    console.log('index:'+this.state.onShow)
                } else {
                    this.setState({
                        isLogin:false,
                        onShow:false
                    })
                }
            });
    }

    render() {
        return (
            <div className="span2">
                <div className="main-left-col">
                    <h1><i className="icon-shopping-cart icon-large"></i> Adminize</h1>
                    <ul className="side-nav">
                        {
                            !this.state.isLogin?
                                <li className="active">
                                    <a href="/login"><i className="icon-home"></i> 登录</a>
                                </li>:null
                        }

                        {
                            this.state.onShow?<li className="active" >
                            <a href="/sign"><i className="icon-home"></i> 注册</a>
                        </li>:null}
                        {
                            this.state.isLogin?
                                <li className="active">
                                    <a href="/logout"><i className="icon-home"></i> 退出登录</a>
                                </li>:null
                        }
                    </ul>
                    <ul className="side-nav">
                        <li className="active">
                            <a href="/userInfo"><i className="icon-home"></i> 个人信息</a>
                        </li>
                        <li className="active">
                            <a href="/searchScore"><i className="icon-home"></i> 成绩查询</a>
                        </li>
                        {
                            this.state.onShow?<li className="active" >
                                <a href="/userAdmin"><i className="icon-home"></i> 用户管理</a>
                            </li>:null}

                    </ul>

                </div>
            </div>
        );
    }
}