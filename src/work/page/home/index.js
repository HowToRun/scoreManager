import React from 'react';
import {inject, observer} from 'mobx-react';
import Menu from '../../components/menu/Menu';
import Header from '../../components/header/Header';
import Body from '../../components/body/Body';
import {axiosGetJson} from "../../common/axiosUtils";
import userStore from "../../mobx";

@inject('userStore', 'test','locales')
@observer
class Index extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Body body="body"/>
            </div>
        );
    }
}


export default Index;
