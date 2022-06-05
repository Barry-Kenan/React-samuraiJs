import React from 'react';
import s from './ProfileInfo.module.css'
import {reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../common/FormControls/FormControls";

const ProfileDataForm = ({handleSubmit, profile,error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {error && <div className={s.formSummaryError}>{error}</div>}
            <button onClick={() => {
            }}>Save
            </button>
            <div>
                <b>Full name: </b>{createField("Full name", "fullName", [], Input)}
            </div>
            <div>
                <b>Looking for a job: </b>{createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
            </div>
            <div>
                <b>My professional skills: </b>
                {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}
            </div>
            <div>
                <b>About me: </b>{profile.aboutMe}
                {createField("About me", "aboutMe", [], Textarea)}
            </div>

            <div>
                <b>Contacts: </b>{Object.keys(profile.contacts).map(key => {
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