import React from 'react';
import { Query } from 'react-apollo';
import AppBanner from '../res/images/RoomAidLogo.png';
import LoginPanel from '../components/LoginPanel';
import LoginQuery from '../graphql/queries/login-with';
import { RoutePath } from '../Routes';

export class LoginPage extends React.Component {

    state = {
        isLoading: false,
        serverResponse: {},
        attemptedLoginCredentials: {},
    }

    navigateTo = (page) => {
        this.props.history.push(page);
    }

    loginHandler = (response, err) => {
        if (!response.success) {
            // this.props.addNotification({
            //     id: 0,
            //     text: "Login Failed.",
            // })
        }
    }

    onLoginFormSubmit = (err, creds) => {
        const {
            username,
            password,
        } = creds;

        if (err && err.username) {
            this.setState({ isUsernameError: true });
            return;
        }
        if (err && err.password) {
            this.setState({ isUsernameError: false, isPasswordError: true });
            return;
        }

        this.setState({
            isLoading: true,
            isUsernameError: false,
            isPasswordError: false,
            attemptedLoginCredentials: { username, password },
        })

        // this.loginLoadingSwitch = setTimeout(() => this.setState({isLoading: false}), 2780)
        // this.loginHandler({success: false});
        // this.navigateTo("/home");
    }

    startNavigating = () => {
        this.navigationInterval = window.setInterval(
            () => this.props.history.push(RoutePath.Dashboard), 2780);
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        // clearTimeout(this.loginLoadingSwitch);
        clearInterval(this.navigationInterval);
    }

    render() {
        const {
            isLoading,
            isUsernameError,
            isPasswordError,
            attemptedLoginCredentials: { username, password },
        } = this.state;

        const themeColors = {
            panel: "#BCEDF6",
            background: "#C9E4E7",
            panelShadow: "rgba(68, 138, 255, 0.7)",
        }

        const panelStyle = {
            width: "80%",
            maxWidth: "250px",
            borderRadius: "10px",
            padding: "2rem 3rem",
            margin: "1rem",
            backgroundColor: themeColors.panel,
            boxShadow: `0px 0px 20px 2px ${themeColors.panelShadow}, 0px 0px 20px 2px ${themeColors.panelShadow}`,
        }

        const DisplayedLoginPanel = ({ loading, defaultUsername = undefined }) => (
            <LoginPanel
                logo={AppBanner}
                bannerWidth="20rem"
                onSubmit={this.onLoginFormSubmit}
                loading={loading}
                defaultUsername={defaultUsername}
                usernameError={isUsernameError}
                passwordError={isPasswordError}
                style={panelStyle} />
        )

        const SuccessfulLoginPrompt = ({ name, token }) => {
            localStorage.setItem('token', token);
            // console.log("Received Token", token);
            return (
                <div id='successful-login-prompt'
                    className="centered"
                    style={{
                        ...panelStyle,
                        padding: "3rem",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        backgroundColor: themeColors.panel,
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                    }}>
                    {`Welcome, ${name}!`}
                </div>
            )
        }
        
        return (
            <div
                className="view background-color"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: themeColors.background,
                }}>
                {!isLoading
                    ? (
                        DisplayedLoginPanel({loading: false})
                    ) : (
                        <Query query={LoginQuery} variables={{ username, password }}>
                            {({ loading, error, data }) => {
                                if (loading) return <DisplayedLoginPanel defaultUsername={username} loading={true} />
                                if (error) {
                                    return <DisplayedLoginPanel loading={false} />
                                }
                                this.startNavigating();
                                return <SuccessfulLoginPrompt name={data.loginWith.firstName} token={data.loginWith.jwt} />
                            }}
                        </Query>
                    )}
            </div>
        )
    }
}