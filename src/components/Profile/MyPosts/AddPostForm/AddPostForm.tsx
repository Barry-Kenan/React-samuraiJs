import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, TextareaField} from "../../../common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../../../utils/validators";
import {NewPostFormType} from "../MyPosts";
import {Button} from "antd";


const maxLength30 = maxLengthCreator(30)
type NewMessageFormValuesTypeKeys = Extract<keyof NewPostFormType, string>
type PropsType = {}

const AddNewPostForm: React.FC<InjectedFormProps<NewPostFormType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormValuesTypeKeys>("new Post", "newPostText",
                    [required, maxLength30], TextareaField)}
            </div>
            <div>
                <Button htmlType={"submit"}>Add post</Button>
            </div>
        </form>
    )
}

export default reduxForm<NewPostFormType>({form: 'ProfileAddPost'})(AddNewPostForm)