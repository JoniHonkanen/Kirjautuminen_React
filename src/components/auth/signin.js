import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';


//https://redux-form.com/6.3.1/docs/GettingStarted.md/
//REDUX FORM V6

class Signin extends Component {

    handleFormSubmit({ email, password }) {
      //  console.log(email, password);
        this.props.signinUser({ email, password }); //signinUser action.index tiedostosta
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>E-Mail:</label>
                    <Field
                        name="email"
                        component="input"
                        type="email"
                        className="form-control" />
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <Field
                        name="password"
                        component="input"
                        type="password"
                        className="form-control" />
                </fieldset>
                {this.renderAlert()}
                <button type="submit" className="btn btn-primary">Sign In</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

const form = reduxForm({ form: 'signin' })(Signin)
export default connect(mapStateToProps, actions)(form)