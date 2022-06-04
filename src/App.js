import React, {useEffect} from "react";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Games from "./components/Games/Games"
import {Route, Routes} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainerFunc from "./components/Profile/ProfileContainerFunc";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import {initializeApp} from "./redux/app-reducer";


const App = (props) => {
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
                    <Route path='/profile' element={<ProfileContainerFunc/>}/>
                    <Route path='/profile/:userId' element={<ProfileContainerFunc/>}/>
                    <Route path='/dialogs' element={<DialogsContainer/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/users' element={<UsersContainer/>}/>
                    <Route path='/games' element={<Games/>}/>
                </Routes>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp})(App);
