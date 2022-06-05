import React, {useState} from 'react'
import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusFunc from "./ProfileStatusFunc";
import ava from './../../../assets/images/ava.jpg'
import ProfileDataForm from "./ProfileDataForm";


const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        );
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <div>
                    <img src={profile.photos.large || ava} alt="photo" className={s.mainPhoto}/>
                    {isOwner && <div><input type={'file'} onChange={onMainPhotoSelected}/></div>}
                </div>
                {editMode ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={()=>{setEditMode(true)}} />
                }
                <div>
                    <ProfileStatusFunc status={status} updateStatus={updateStatus}/>
                </div>

            </div>
        </div>

    )
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return (
        <>
            {isOwner && <div> <button onClick={goToEditMode}>Edit</button> </div>}
            <div>
                <b>Full name: </b>{profile.fullName}
            </div>

            <div>
                <div>
                    <b>Looking for a job: </b>{profile.lookingForAJob ? 'yes' : 'no'}
                </div>
                {profile.lookingForAJob &&
                <div>
                    <b>My professional skills: </b>{profile.lookingForAJobDescription}
                </div>
                }
                <div>
                    <b>Contacts: </b>{Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                })}
                </div>
            </div>
        </>
    )
}



const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}: </b>{contactValue}</div>
}

export default ProfileInfo
