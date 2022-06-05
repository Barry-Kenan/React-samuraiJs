import React, {useEffect} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {useParams} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


let ProfileContainer = (props) => {
    const params = useParams()
    const userId = params.userId

    useEffect(() => {
        props.getUserProfile(userId)
    },[userId])
    useEffect(() => {
        props.getStatus(userId)
    },[userId])
    return <Profile {...props} profile={props.profile} status={props.status} updateStatus={props.updateStatus}
                    isOwner={!userId} savePhoto={props.savePhoto} saveProfile={props.saveProfile} />

}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
})




export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    WithAuthRedirect
)(ProfileContainer);