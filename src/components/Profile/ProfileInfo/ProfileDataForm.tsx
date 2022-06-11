import React from 'react';
import s from './ProfileInfo.module.css'
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../common/FormControls/FormControls";
import {ProfileType} from "../../../types/types";
import {NewPostFormType} from "../MyPosts/MyPosts";

type ProfileTypeKeys = Extract<keyof ProfileType, string>
type PropsType = {
    profile:ProfileType
}

const ProfileDataForm:React.FC<InjectedFormProps<NewPostFormType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {props.error && <div className={s.formSummaryError}>{props.error}</div>}
            <button onClick={() => {
            }}>Save
            </button>
            <div>
                <b>Full name: </b>{createField<ProfileTypeKeys>("Full name", "fullName", [], Input)}
            </div>
            <div>
                <b>Looking for a job: </b>{createField<ProfileTypeKeys>("", "lookingForAJob", [], Input, {type: "checkbox"})}
            </div>
            <div>
                <b>My professional skills: </b>
                {createField<ProfileTypeKeys>("My professional skills", "lookingForAJobDescription", [], Textarea)}
            </div>
            <div>
                <b>About me: </b>{props.profile.aboutMe}
                {createField<ProfileTypeKeys>("About me", "aboutMe", [], Textarea)}
            </div>

            <div>
                <b>Contacts: </b>{Object.keys(props.profile.contacts).map(key => {
                return <div className={s.contact}>
                <b>{key}: {createField(key, "contacts."+key, [], Input)}</b>
                </div>
            })}
            </div>

        </form>
    )
}

const ProfileDataReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataReduxForm;