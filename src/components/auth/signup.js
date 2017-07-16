import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

//REDUX FORM V6
class Signup extends Component {

    handleFormSubmit(formProps) {
        // Call action creator to sign up the user!
        this.props.signupUser(formProps);
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email</label>
                    <Field
                        name="email"
                        component={renderField}
                        type="mail"
                        className="form-control"
                    />
                </fieldset>
                <fieldset className="form-group">
                    <label>password</label>
                    <Field
                        name="password"
                        component={renderPassword}
                        className="form-control"
                    />
                </fieldset>
                <fieldset className="form-group">
                    <label>Confirm Password</label>
                    <Field
                        name="passwordConfirm"
                        component={renderPassword}
                        className="form-control"
                    />
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign Up</button>
            </form>
        );
    }
}

// V6 MALLI
//http://redux-form.com/6.0.2/examples/syncValidation/
const validate = values => { // TARKISTETAAN ONKO KAIKKI OIKEIN
    const errors = {}

    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.password) {
        errors.password = 'Please enter a password';
    }

    if (!values.passwordConfirm) {
        errors.passwordConfirm = 'Please enter a password confirmation';
    }

    if (values.password !== values.passwordConfirm) {
        errors.password = 'passwords must match';
    }
    return errors
}

const renderPassword = ({ input, meta: { touched, error } }) => ( // FIELD kohtiin komponentiksi
    //Jos haluaa errorin div oikealle puolelle, muuttaa div:n span:ksi
    <div>
        <input {...input} type="password" />
        {touched && error && <div className="error">{error}</div>}
    </div>
)

const renderField = ({ input, meta: { touched, error } }) => ( // FIELD kohtiin komponentiksi
    //Jos haluaa errorin div oikealle puolelle, muuttaa div:n span:ksi
    <div>
        <input {...input} />
        {touched && error && <div className="error">{error}</div>}
    </div>
)

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}


const form = reduxForm({ form: 'signup', validate: validate })(Signup);
export default connect(mapStateToProps, actions)(form)

/*
export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm']
})(Signup);
*/
