import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class Login extends React.Component {
    static propTypes = {
        getUserData: PropTypes.func,
        loginUser: PropTypes.func,
        registerUser: PropTypes.func,
        resetPasswordEmail: PropTypes.func
    };

    constructor (props) {
        super(props);

        this.state = {
            openDialogLogin: false,
            openDialogForgotPassword: false,
            email: '',
            emailError: '',
            emailValid: false,
            password: '',
            passwordError: '',
            passwordValid: false
        };
    }

    handleOpenDialogLogin = () => {
        this.setState({openDialogLogin: true});
        this.setState({openDialogForgotPassword: false});
    }

    handleCloseDialogLogin = () => {
        this.setState({openDialogLogin: false});
    }

    handleOpenDialogForgotPassword = (e) => {
        e.preventDefault();
        this.setState({openDialogLogin: false});
        this.setState({openDialogForgotPassword: true});
    }

    handleCloseDialogForgotPassword = () => {
        this.setState({openDialogForgotPassword: false});
    }

    handleValidateEmail = () => {
        const emailValid = /.+@.+\..+/i.test(this.state.email);

        this.setState(() => {
            return {
                emailValid: emailValid,
                emailError: emailValid ? '' : 'Invalid email address'
            };
        });
    }

    handleValidatePassword = () => {
        const passwordValid = this.state.password.length >= 6;

        this.setState(() => {
            return {
                passwordValid: passwordValid,
                passwordError: passwordValid ? '' : 'Password should be at least 6 characters'
            };
        });
    }

    handleLogIn = () => {
        this.handleValidateEmail();
        this.handleValidatePassword();

        if (this.state.emailValid && this.state.passwordValid) {
            this.props.loginUser({email: this.state.email, password: this.state.password}).then(user => {
                if (user.payload.errorCode) {
                    switch (user.payload.errorCode) {
                    case 'auth/invalid-email':
                    case 'auth/user-disabled':
                    case 'auth/user-not-found': {
                        this.setState({emailError: user.payload.errorMessage});
                        break;
                    }
                    case 'auth/wrong-password': {
                        this.setState({passwordError: user.payload.errorMessage});
                        break;
                    }
                    }
                } else {
                    this.props.getUserData(user.payload);
                }
            });
        }
    }

    handleSignUp = () => {
        this.handleValidateEmail();
        this.handleValidatePassword();

        if (this.state.emailValid && this.state.passwordValid) {
            this.props.registerUser({email: this.state.email, password: this.state.password}).then(user => {
                if (user.payload.errorCode) {
                    switch (user.payload.errorCode) {
                    case 'auth/invalid-email':
                    case 'auth/email-already-in-use':
                    case 'auth/too-many-requests': {
                        this.setState({emailError: user.payload.errorMessage});
                        break;
                    }
                    case 'auth/weak-password': {
                        this.setState({passwordError: user.payload.errorMessage});
                        break;
                    }
                    }
                }
            });
        }
    }

    handleForgotPassword = () => {
        this.props.resetPasswordEmail(this.state.email).then(message => {
            if (message.payload.errorCode) {
                this.setState({emailError: message.payload.errorMessage});
            } else {
                this.handleOpenDialogLogin();
            }
        });
    }

    handleChangeValue = (e) => {
        const target = e.target;
        let value = {};

        value[target.id] = target.value;

        this.setState(() => {
            return value;
        });
    }

    render () {
        const actionsLogin = [
            <FlatButton
                label='Log in'
                primary
                onTouchTap={this.handleLogIn}
            />,
            <FlatButton
                label='Sign up'
                primary
                onTouchTap={this.handleSignUp}
            />
        ];

        const actionsForgotPassword = [
            <FlatButton
                label='Back'
                primary
                onTouchTap={this.handleOpenDialogLogin}
            />,
            <FlatButton
                label='Sent'
                primary
                onTouchTap={this.handleForgotPassword}
            />
        ];

        return (
            <div>
                <FlatButton label='Login' className='btn-login' onClick={this.handleOpenDialogLogin} />
                <Dialog
                    title='Login'
                    actions={actionsLogin}
                    modal={false}
                    open={this.state.openDialogLogin}
                    onRequestClose={this.handleCloseDialogLogin}
                    contentClassName='dialog'
                >
                    <TextField
                        type='text'
                        id='email'
                        value={this.state.email}
                        errorText={this.state.emailError}
                        onChange={e => this.handleChangeValue(e)}
                        onBlur={this.handleValidateEmail}
                        fullWidth
                        hintText='Email'
                    />
                    <br />
                    <TextField
                        type='password'
                        id='password'
                        value={this.state.password}
                        errorText={this.state.passwordError}
                        onChange={e => this.handleChangeValue(e)}
                        onBlur={this.handleValidatePassword}
                        fullWidth
                        hintText='Password'
                    />
                    <br />
                    <a href='#' onClick={this.handleOpenDialogForgotPassword} className='forgot-password'>Forgot password?</a>
                </Dialog>
                <Dialog
                    title='Forgot password'
                    actions={actionsForgotPassword}
                    modal={false}
                    open={this.state.openDialogForgotPassword}
                    onRequestClose={this.handleCloseDialogForgotPassword}
                    contentClassName='dialog'
                >
                    <TextField
                        type='text'
                        id='email'
                        value={this.state.email}
                        errorText={this.state.emailError}
                        onChange={e => this.handleChangeValue(e)}
                        onBlur={this.handleValidateEmail}
                        fullWidth
                        hintText='Email'
                    />
                </Dialog>
            </div>
        );
    }
}

export default Login;
