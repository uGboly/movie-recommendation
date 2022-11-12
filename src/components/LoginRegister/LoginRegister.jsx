import React from 'react';
import {
    Button,
    Input,
    FormControl,
    InputLabel,
    Grid,
    Typography
} from '@mui/material';
import axios from 'axios';

class LoginRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginName: '',
            registerName: '',
            loginPassword: '',
            registerPassword: '',
            registerPassword2: '',
            registerState: ''
        };
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleLogin() {
        const formData = new FormData();
        formData.append('login_name', this.state.loginName);
        formData.append('password', this.state.loginPassword);

        axios.post('/admin/login', formData)
            .then(res => {
                this.props.changeContext({loggedUser: res.data.login_name});
                this.props.history.push(`/ratings`);
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    loginName :  '',
                    loginPassword : ''
                });
            });
    }

    handleRegister() {
        if (this.state.registerPassword !== this.state.registerPassword2) {
            this.setState({
                registerState: "两次输入的密码不一致"
            });
            return;
        }

        const formData = new FormData();
        formData.append('login_name', this.state.registerName);
        formData.append('password', this.state.registerPassword);

        axios.post('/user', formData)
            .then(() => {
                this.setState({
                    registerState: "Successfully registered!"
                });
            })
            .catch(err => {
                this.setState({
                    registerName:  '',
                    registerPassword: '',
                    registerPassword2: '',
                    firstName: '',
                    lastName: '',
                    occupation: '',
                    location: '',
                    description: '',
                    registerState: 'Fail to register because ' + err.response
                });
            });
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    render() {
        let registerHint = (
            <Grid item xs={12}>
                <Typography>
                {this.state.registerState}
                </Typography>
            </Grid>
        );

        return (
            <Grid container spacing={8} direction='row' justifyContent='space-around'>
                <Grid item container sm={4} spacing={3}>
                    <Grid item xs={12}>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="login-name">登录名</InputLabel>
                            <Input id="login-name" name='loginName' value={this.state.loginName} onChange={this.handleChange} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="loginPassword">密码</InputLabel>
                            <Input id="loginPassword" name='loginPassword' type='password' value={this.state.loginPassword} onChange={this.handleChange} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" component="button" onClick={this.handleLogin}>登录</Button>
                    </Grid>
                </Grid>

                <Grid item container sm={4} spacing={2} > 
                    {this.state.registerState !== '' ? registerHint : ''}
                    
                    <Grid item xs={12}>
                        <FormControl variant="standard" >
                            <InputLabel htmlFor="register-name">登录名</InputLabel>
                            <Input id="register-name" name='registerName' value={this.state.registerName} onChange={this.handleChange} />
                        </FormControl>
                    </Grid>
 
                    <Grid item xs={12}>
                        <FormControl variant="standard" >
                            <InputLabel htmlFor="registerPassword">密码</InputLabel>
                            <Input id="registerPassword" name='registerPassword' type='password' value={this.state.registerPassword} onChange={this.handleChange} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="registerPassword2">请再次输入密码</InputLabel>
                            <Input id="registerPassword2" name='registerPassword2' type='password' value={this.state.registerPassword2} onChange={this.handleChange} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" component="button" onClick={this.handleRegister}>注册</Button>
                    </Grid>
                </Grid>
            </Grid>
            
        );
    }
}

export default LoginRegister;