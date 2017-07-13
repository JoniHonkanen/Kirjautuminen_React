import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

//REDUX FORM V6
class Signup extends Component {

    render() {
        const { handleSubmit } = this.props;

        return (
            <form>
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
                        component={renderField}
                        type="password"
                        className="form-control"
                    />
                </fieldset>
                <fieldset className="form-group">
                    <label>Confirm Password</label>
                    <Field
                        name="passwordConfirm"
                        component={renderField}
                        type="password"
                        className="form-control"
                    />
                </fieldset>
                <button action="submit" className="btn btn-primary">Sign Up</button>
            </form>
        );
    }
}

/*
function validate(formProps) { //pitaa olla validate niminen! (ReduxFormin oma homma)
    const errors = {};
    console.log(formProps);

    if (formProps.password !== formProps.passwordConfirm) {
        errors.password = 'passwords must match';
    }

    return errors;
}
*/
// V6 MALLI
//http://redux-form.com/6.0.2/examples/syncValidation/
const validate = values => {
    const errors = {}
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (values.password !== values.passwordConfirm) {
        errors.password = 'passwords must match';
    }
    return errors
}

const renderField = ({ input, meta: { touched, error } }) => ( // FIELD kohtiin komponentiksi
    //Jos haluaa errorin div oikealle puolelle, muuttaa div:n span:ksi
    <div>
        <input {...input} />
        {touched && error && <div>{error}</div>} 
    </div>
)


const form = reduxForm({ form: 'signup', validate: validate })(Signup);
export default form

/*
export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm']
})(Signup);
*/
