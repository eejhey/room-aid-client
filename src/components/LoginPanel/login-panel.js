import React from 'react';
import PropTypes from 'prop-types';
import { RingLoader } from 'react-spinners';
import Margin from '../margin';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './login-panel.css';

export class LoginPanel extends React.PureComponent {

    state = {
        usernameError: false,
        passwordError: false,
        usernameValue: this.props.defaultUsername || "",
        passwordValue: "",
    }

    onLoginPanelSubmit = (event) => {
        event.preventDefault();

        const { usernameValue, passwordValue } = this.state;

        let err = {};
        if (!usernameValue) err.username = true;
        if (!passwordValue) err.password = true;

        this.setState({
            usernameError: !!err.username,
            passwordError: !err.username && !!err.password,
        });

        const { onSubmit } = this.props

        if (!onSubmit) return;

        onSubmit(Object.keys(err).length ? err : null, {
            username: usernameValue,
            password: passwordValue,
        });
    }

    onInputChange = (event) => {
        const { target: { id: inputId, value } } = event;
        switch (inputId) {
            case 'login-field':
                this.setState({usernameValue: value, usernameError: false});
                break;
            case 'password-field':
                this.setState({passwordValue: value, passwordError: false})
                break;
            default:
                break;
        }
    }

    render() {
        const {
            bannerWidth,
            bannerHeight,
            loading,
            logo,
            passwordLabel,
            style,
            usernameLabel,
        } = this.props;
        const {
            usernameError,
            usernameValue,
            passwordError,
            passwordValue,
        } = this.state;
    
        const themeColors = {
            primaryColor: "#448AFF",
        }
    
        const loginOrLoader = loading
            ? ( 
                <div
                    className="ring-loader">
                    <RingLoader 
                        color={themeColors.primaryColor}
                        size={3}
                        sizeUnit={"rem"} />
                </div>
            ) : (
                <Button
                    type="submit"
                    color="primary"
                    variant="contained">
                    {"Login"}
                </Button>
            )
    
        return (
            <form
                id="login-panel-container"
                style={style}
                onSubmit={this.onLoginPanelSubmit}
                method="post">
                <Logo
                    src={logo}
                    style={{
                        width: bannerWidth,
                        height: bannerHeight,
                    }} />
                <Margin
                    height="0.8rem" />
                <TextField
                    id="login-field"
                    label={usernameLabel || "Username"}
                    error={usernameError}
                    value={usernameValue}
                    onChange={this.onInputChange}
                    fullWidth
                    style={{ backgroundColor: "#ffffff", borderRadius: "4px"}}
                    variant="outlined" />
                <Margin
                    height="0.5rem" />
                <TextField
                    id="password-field"
                    label={passwordLabel || "Password"}
                    error={passwordError}
                    value={passwordValue}
                    type="password"
                    onChange={this.onInputChange}
                    fullWidth
                    style={{ backgroundColor: "#ffffff", borderRadius: "4px"}}
                    variant="outlined" />
                <Margin
                    height="1rem" />
                {loginOrLoader}
                <RegisterLink visible={!loading} />
            </form>
        )
    }
}

const Logo = (props) => {
    const image = props.src !== undefined
        ? (
            <img
                alt={props.name || "login-logo"}
                className={`logo ${props.className}`}
                style={props.style}
                src={props.src} />
        ) : (
            <div
                className={`logo ${props.className}`}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid black",
                    ...props.style,
                }}>
                {"LOGO"}
            </div>
        )

    return image;
}

const RegisterLink = (props) => {
    const text = props.visible
        ? "Register"
        : "";

    return (
        <Button
            style={{
                alignSelf: "center",
                marginTop: "0.5rem",
            }}>
            {text}
        </Button>
    )
}

LoginPanel.propTypes = {
    bannerWidth: PropTypes.string,
    bannerHeight: PropTypes.string,
    defaultUsername: PropTypes.string,
    loading: PropTypes.bool,
    logo: PropTypes.string,
    onSubmit: PropTypes.func,
    passwordError: PropTypes.bool,
    passwordLabel: PropTypes.string,
    style: PropTypes.object,
    usernameError: PropTypes.bool,
    usernameLabel: PropTypes.string,
}