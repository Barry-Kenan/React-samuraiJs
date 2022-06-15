import React from "react";
import s from './FormControls.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators";
import {Input} from "antd";

const {TextArea} = Input
type FormControlsPropsType = {
    meta: WrappedFieldMetaProps,
    children: React.ReactNode
}


const FormControl: React.FC<FormControlsPropsType> = ({meta:{touched, error},children}) => {
    const hasError = touched && error;

    return(
        <div className={s.formControl + ' ' + (hasError ? s.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}


export const TextareaField: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><TextArea {...input} {...restProps}/></FormControl>
}

export const InputField: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><Input {...input} {...restProps}/></FormControl>
}




export function createField<FormKeysType extends string>(placeholder:string | undefined, name:FormKeysType, validators:Array<FieldValidatorType>,
                            component: React.FC<WrappedFieldProps>, props = {}, text = ""){
    return (
        <div>
            <Field placeholder={placeholder}
                   name={name}
                   validate={validators}
                   component={component}
                   {...props} /> {text}
        </div>
    )
}




