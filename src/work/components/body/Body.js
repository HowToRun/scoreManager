import React, {Component} from 'react';
import Menu from '../menu/Menu';
import './body.scss'
import LoginComponent from '../login/LoginComponent';
import SignComponent from '../sign/SignComponent';
import LogoutComponent from '../logout/LogoutComponent';
import userStore from '../../mobx';
import UserInfoComponent from '../userInfo/UserInfoComponent';
import SearchScoreComponent from '../searchScore/SearchScoreComponent';
import UserAdminComponent from '../userAdmin/userAdminComponent';

export default class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            body: this.props.body,
            onShow: this.props.onShow
        }
        console.log(this.state.body)
    }



    showBody = () => {
        const body = this.state.body;
        if (body === 'body') {
            return null;
        } else if (body === 'login') {
            return <LoginComponent/>
        } else if (body === 'sign') {
            return <SignComponent/>
        } else if (body === 'logout') {
            return <LogoutComponent/>
        }else if (body === 'userInfo') {
            return <UserInfoComponent/>
        }else if (body === 'searchScore') {
            return <SearchScoreComponent/>
        }else if (body === 'UserAdmin') {
            return <UserAdminComponent />
        }
    }

    render() {
        return (
            <div>
                <span className="menu">
                    <Menu onShow={this.state.onShow}/>
                </span>
                {this.showBody()}
            </div>
        );
    }
}