import React, { useContext, useEffect, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);

    const [currState, setCurrState] = useState('Login');
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);

    // Handle input changes
    const onChangehandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle login/signup submit
    const onLogin = async (event) => {
        event.preventDefault();
        setLoading(true);

        let newUrl = currState === 'Login'
            ? `${url}/api/user/login`
            : `${url}/api/user/register`;

        try {
            const response = await axios.post(newUrl, data);
            console.log('Response:', response.data);

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role || 'user'); // Store role if needed

                toast.success(`${currState} successful!`);
                setShowLogin(false);
            } else {
                toast.error(response.data.message || 'Something went wrong!');
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                    <img
                        onClick={() => setShowLogin(false)}
                        src={assets.cross_icon}
                        alt='Close'
                    />
                </div>

                <div className='login-popup-inputs'>
                    {currState === 'Sign Up' && (
                        <input
                            name='name'
                            onChange={onChangehandler}
                            value={data.name}
                            type='text'
                            placeholder='Your name'
                            required
                        />
                    )}
                    <input
                        name='email'
                        onChange={onChangehandler}
                        value={data.email}
                        type='email'
                        placeholder='Your email'
                        required
                    />
                    <input
                        name='password'
                        onChange={onChangehandler}
                        value={data.password}
                        type='password'
                        placeholder='Password'
                        required
                    />
                </div>

                <button type='submit' disabled={loading}>
                    {loading
                        ? 'Please wait...'
                        : currState === 'Sign Up'
                        ? 'Create Account'
                        : 'Login'}
                </button>

                <div className='login-pop-condition'>
                    <input type='checkbox' required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

                {currState === 'Login' ? (
                    <p>
                        Don't have an account?{' '}
                        <span onClick={() => setCurrState('Sign Up')}>Sign Up</span>
                    </p>
                ) : (
                    <p>
                        Already have an account?{' '}
                        <span onClick={() => setCurrState('Login')}>Login</span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;
