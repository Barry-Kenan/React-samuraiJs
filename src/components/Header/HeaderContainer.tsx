import React from "react";
import Header, {DispatchPropsType, MapPropsType} from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";


const HeaderContainer:React.FC<MapPropsType & DispatchPropsType> = (props) => {
    return <Header {...props}/>
}

let mapStateToProps = (state:AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect<MapPropsType,DispatchPropsType, {}, AppStateType>(mapStateToProps,{ logout})(HeaderContainer);