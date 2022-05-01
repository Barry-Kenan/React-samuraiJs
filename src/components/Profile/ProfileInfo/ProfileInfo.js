import React from 'react'
import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusFunc from "./ProfileStatusFunc";


const ProfileInfo = ({profile, status, updateStatus}) => {
    if(!profile){
        return <Preloader />
    }

    return (
        <div>
            <div>
                <img src="https://miro.medium.com/max/1400/1*itlWgBn4CfMKGg7qmh7vHQ.jpeg" alt="Marvel"/>
            </div>
            <div className={s.descriptionBlock}>
                <div>
                    <img src={profile.photos.large} alt="photo"/>
                </div>
                <div>
                    {profile.fullName}
                </div>
                <div>
                    <ProfileStatusFunc status={status} updateStatus={updateStatus} />
                </div>

            </div>
        </div>

    )
}

export default ProfileInfo
