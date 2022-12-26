import React, { Component } from "react";
import { connect } from 'react-redux'
import UserItem from "../components/page/UserItem";
import { loadContact, removeContact, resendContact, updateContact } from "../actions/users";

class UserList extends Component {

    componentDidMount() {
        this.props.load()
    }

    scrolling = (event) => {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            console.log('Scrolled')
        }
    }

    render() {
        return (
            <div onScroll={this.scrolling} className={this.props.users > 6 ? "grid sm:grid-cols-2 md:grid-cols-3 gap-4 py-4 px-2 max-h-screen overflow-y-auto h-52" : "grid sm:grid-cols-2 md:grid-cols-3 gap-4 py-4 px-2 max-h-screen overflow-y-auto h-107"}>
                {
                    this.props.users.map((user, index) => (
                        <UserItem key={index} users={user} sent={user.id} resend={() => this.props.resend(user.id, user.name, user.phone)} remove={() => this.props.remove(user.id)} update={(name, phone) => this.props.update(user.id, name, phone)} />
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    users: state.users
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    load: () => dispatch(loadContact()),
    remove: (id) => dispatch(removeContact(id)),
    resend: (id, name, phone) => dispatch(resendContact(id, name, phone)),
    update: (id, name, phone) => dispatch(updateContact(id, name, phone))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList)