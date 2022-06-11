import React, {useEffect} from "react";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Games from "./components/Games/Games"
import {Route, Routes} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import {initializeApp} from "./redux/app-reducer";
import {AppStateType} from "./redux/redux-store";
import ProfileContainer from "./components/Profile/ProfileContainer";

type MapPropsType = {
    initialized:boolean
}
type MapDispatchPropsType = {
    initializeApp: () => void
}

const App:React.FC<MapPropsType & MapDispatchPropsType> = (props) => {
    useEffect(() => {
        props.initializeApp()
    })
    if (!props.initialized) {
        return <Preloader/>
    }
    return (
        <div className="App-wrapper">
            <HeaderContainer/>
            <Navbar/>
            <div className="App-wrapper-content">
                <Routes>
                    <Route path='/' element={<ProfileContainer/>}/>
                    <Route path='/profile' element={<ProfileContainer/>}/>
                    <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                    <Route path='/dialogs' element={<DialogsContainer/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/users' element={<UsersContainer/>}/>
                    <Route path='/games' element={<Games/>}/>
                </Routes>
            </div>
        </div>
    );
}

const mapStateToProps = (state:AppStateType) => ({
    initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp})(App);