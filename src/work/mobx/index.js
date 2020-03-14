import {observable, computed, action} from 'mobx';
class userStoreClass {
     user = {
        loginId: '',
        role: 8,
        isLogin:false
    };
    count = 0;
    @computed get userName(){
        return this.user.loginId;
    }
    @computed get userRole(){
        return this.user.role;
    }
    @computed get isLogin(){
        return this.user.isLogin;
    }
    @action changeUser(loginId){
        this.user.loginId=loginId
    }
    @action changeUserRole(role){
        this.user.role=role
    }
    @action changeloginState(){
        this.user.role=!this.user.isLogin
    }
}
const userStore = new userStoreClass();
export default userStore;
