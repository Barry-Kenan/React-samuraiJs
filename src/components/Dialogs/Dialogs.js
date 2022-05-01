import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators";

const maxLength50 = maxLengthCreator(50)

const Dialogs = (props) => {
    let messagesPage = props.messagesPage

    let dialogsElements = messagesPage.dialogs.map(e => <DialogItem name={e.name} key={e.id} id={e.id}/>)
    let messagesElements = messagesPage.messages.map(e => <Message message={e.message} key={e.id} />)


    const addNewMessage = (value) => {
        props.sendMessage(value.newMessageText)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <AddMessageFormRedux onSubmit={addNewMessage} />
            </div>
        </div>
    )
}


const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       validate={[required, maxLength50]}
                       name="newMessageText" placeholder="new Message Text"/>
            </div>
            <div>
                <button>Send Message</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form : 'DialogAddMessage'})(AddMessageForm)



export default Dialogs;