import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Routes } from './Routes';
import { RoutePath } from './Routes';
import './App.css';
import './styles/colors.css';

const authHeaders = () => {
    const token = localStorage.getItem('token');

    return {
        'Authorization': token ? token : '',
    }
}

const client = new ApolloClient({
    uri: 'https://room-aid-api.herokuapp.com/graphql',
    // uri: 'http://localhost:4000/graphql',
    headers: authHeaders(),
});

export class Setup extends React.PureComponent {
    componentDidMount() {
        console.log("App initialized");
    }

    render() {
        return null;
    }
}

export const LandingPage = props => {
    props.history.push(RoutePath.Login);
    return null;
}

class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Router>
                    <Routes />
                </Router>
            </ApolloProvider>
        );
    }
}

export default App;
