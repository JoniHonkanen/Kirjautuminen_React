import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {

    loggedIn() {
        console.log(this.props.auth);
        if (this.props.auth) {
            console.log(this.auth);
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/signout">Sign Out</Link>
                </li>
            );
        } else {
            console.log(this.props.auth);
            return [
                <li className="nav-item" key={1}>
                    <Link className="nav-link" to="/signin"> Sign In </Link>
                </li>,
                <li className="nav-item" key={2}>
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
            ];
        }
    }
    render() {
        return (
            <nav className="navbar navbar-light">
                <Link to="/" className="navbar-brand"> Redux Auth </Link>
                <ul className="nav navbar-nav">
                    {this.loggedIn()}
                </ul>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    //   console.log(state);
    return { auth: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
