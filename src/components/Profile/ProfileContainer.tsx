import React, {useEffect} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {useParams} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";

type MapPropsType = {
    profile: ProfileType
    status: string
}
type DispatchPropsType = {
    getUserProfile: (userId:string|undefined)=>void
    getStatus: (userId:string|undefined)=>void
    updateStatus: (status:string)=>void
    savePhoto: (file:File)=>void
    saveProfile: (profile:ProfileType)=>Promise<any>
}


let ProfileContainer: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    const params = useParams<{userId:string | undefined}>()
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

let mapStateToProps = (state:AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
})




export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    WithAuthRedirect
)(ProfileContainer);