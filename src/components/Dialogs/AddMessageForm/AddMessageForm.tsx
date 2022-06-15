import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, TextareaField} from "../../common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../../utils/validators";
import {NewMessageFormType} from "../Dialogs";
import React from "react";

const maxLength50 = maxLengthCreator(50)
type NewMessageFormValuesTypeKeys = Extract<keyof NewMessageFormType, string>
type PropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormValuesTypeKeys>("new Message Text","newMessageText",
                    [required, maxLength50],TextareaField)}
            </div>
            <div>
                <button>Send Message</button>
            </div>
        </form>
    )
}

export default reduxForm<NewMessageFormType>({form : 'DialogAddMessage'})(AddMessageForm)