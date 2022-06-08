import React from "react";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {actions} from "../../redux/dialogs-reducer";


let mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage
    }
}
let mapDispatchToProps = (dispatch) => ({
    sendMessage: (newMessageText) => {
        dispatch(actions.sendMessage(newMessageText))
    }
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs);

