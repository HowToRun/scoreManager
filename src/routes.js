import React, {Fragment} from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import history from '@components/public/history';
import Home from './work/page/home/index'
import {ConfigProvider} from 'antd';
import {inject, observer} from 'mobx-react';
import Menu from './work/components/menu/Menu';
import Login from './work/components/login/Login';
import Sign from './work/components/sign/sign';
import Logout from './work/components/logout/Logout';
import userStore from './work/mobx';
import UserInfo from './work/components/userInfo/UserInfo';
import SearchScore from './work/components/searchScore/SearchScore';
import UserAdmin from "./work/components/userAdmin/userAdmin";

@inject('locales')
@observer
class App extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {locales} = this.props;
        return (
            <ConfigProvider locale={locales.language.data}>
                <BrowserRouter>
                    <Switch>
                        <Route  component={Home}  exact path="/" />
                        <Route  component={Login} path="/login" />
                        <Route  component={Sign} path="/sign" />
                        <Route  component={Logout} path="/logout" />
                        <Route  component={UserInfo} path="/userInfo" />
                        <Route  component={SearchScore} path="/searchScore" />
                        <Route  component={UserAdmin} path="/userAdmin" />
                    </Switch>
                </BrowserRouter>
            </ConfigProvider>
        );
    }
}

export default App;
