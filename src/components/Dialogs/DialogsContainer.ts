import React from "react";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {actions} from "../../redux/dialogs-reducer";
import {AppStateType} from "../../redux/redux-store";


let mapStateToProps = (state:AppStateType) => {
    return {
        messagesPage: state.messagesPage
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {sendMessage: actions.sendMessage}),
    WithAuthRedirect
)(Dialogs);

