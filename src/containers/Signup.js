import React,{useState} from 'react';
import {Header,Container,Button, Form} from 'semantic-ui-react'
import { authenticationService} from '../services';
import Message from '../components/Message';

import {history} from '../helpers'
import { Redirect } from 'react-router-dom';


const Login = () =>{
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")


    function handleSubmit(e){
        e.preventDefault();
        setLoading(true)
        authenticationService.signup(username,email, password, confirmPassword)
        .then(res =>{
            localStorage.setItem("token",res.data.key)
            setLoading(false);
            history.push('/')
        })
        .catch(error=>{
            setLoading(false);
            setError(error.message || error)
        })
    }

    if (authenticationService.isAuthenticated){

        return <Redirect to="/"/>
    }

    return(
        <Container>
        <Header>Sign up for an account</Header>
        {error && (
            <Message danger message={error} />
        )}
            <Form onSubmit={handleSubmit}>
            <Form.Field>
                <label>Username</label>
                <input 
                    placeholder='Username' 
                    value={username} 
                    type='text'
                    onChange={e => setUsername(e.target.value)}
                />
            </Form.Field> 
            <Form.Field>
                <label>Email</label>
                <input 
                    placeholder='Your email' 
                    value={email} 
                    type='email'
                    onChange={e => setEmail(e.target.value)}
                />
            </Form.Field> 
            <Form.Field>
                <label>Password</label>
                <input 
                    placeholder='Password' 
                    value={password} 
                    type='password'
                    onChange={e => setPassword(e.target.value)}
                />
            </Form.Field> 
            <Form.Field>
                <label>Password</label>
                <input 
                    placeholder='Confirm Password' 
                    value={confirmPassword} 
                    type='password'
                    onChange={e => setConfirmPassword(e.target.value)}
                />
            </Form.Field> 
             <Button primary fluid loading={loading} disabled={loading} type='submit'>Login</Button>
        </Form>
    </Container>
    )
}

export default Login;