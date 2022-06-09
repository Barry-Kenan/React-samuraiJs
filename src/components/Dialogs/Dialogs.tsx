import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import {InitialStateType} from "../../redux/dialogs-reducer";
import AddMessageForm from "./AddMessageForm/AddMessageForm";



type PropsType = {
    messagesPage: InitialStateType
    sendMessage: (messageText:string)=>void
}

export type NewMessageFormType = {
    newMessageText: string
}


const Dialogs: React.FC<PropsType> = (props) => {
    let messagesPage = props.messagesPage

    let dialogsElements = messagesPage.dialogs.map(e => <DialogItem name={e.name} key={e.id} id={e.id}/>)
    let messagesElements = messagesPage.messages.map(e => <Message message={e.message} key={e.id} />)


    const addNewMessage = (values: NewMessageFormType) => {
        props.sendMessage(values.newMessageText)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <AddMessageForm onSubmit={addNewMessage} />
            </div>
        </div>
    )
}

export default Dialogs;