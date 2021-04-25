import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useAuth } from '../../contexts/auth-context';
import styles from './Signup.module.css';
import { UseAxios } from '../../custom-hooks/useAxios';
import { useNotifications } from '../../contexts/notifications-context';

export function Signup() {
    const { setUser } = useAuth();
    const { state } = useLocation();
    const [username, setusername] = useState("");
    const [password1, setpassword1] = useState("");
    const [password2, setpassword2] = useState("");
    const navigate = useNavigate();
    const apiCall = UseAxios();
    const {showNotification} = useNotifications();

    const signup = (event) => {
        event.preventDefault();
        if(password1 !== password2) {
            showNotification({ type: 'ERROR', message: 'Password doesnt match'});
            return
        }
        apiCall('post', (res) => {
            setUser(res.data.user);
            console.log(res.data);
            navigate(state?.from? state.from : '/' );
            showNotification({ type: 'SUCCESS', message: res.data.message});
        }, (err) => {
            showNotification({ type: 'ERROR', message: err});
        },{ mappingKey: 'signup' }, { username, password1, password2 }, )
    }

    const onPwd2Change = (e) => {
        setpassword2(e.target.value);
    }

    return (
        <div className={`row ${styles.form__container}`} >
                <form className={`col-6 col-lg-8 col-md-10 col-sm-12 ${styles.form}`} onSubmit = {signup}>
                    <div className={`${styles.title}`}>
                        <h3 className="h3">Streamit</h3>
                        <br/>
                        <h4 className="h4">Sign up</h4>
                        <br/>
                    </div>
                    <div>
                        <label htmlFor="username">Enter username</label>
                        <div className="input input--icon input--fluid">
                            <input type="text" placeholder="Enter text" id="username" value = {username} onChange = { (e) => {setusername(e.target.value)} } />
                        </div> 
                    </div>
                        <br/>
                    <div>
                        <label htmlFor="password1">Enter password</label>
                        <div className="input input--icon input--fluid">
                            <input type="password" placeholder="Enter password" id="password1" value = {password1} onChange = { (e) => {setpassword1(e.target.value)} } />
                        </div> 
                    </div>
                    <br/>
                    <div>
                        <label htmlFor="password2">Re-Enter password</label>
                        <div className="input input--icon input--fluid">
                            <input type="password" placeholder="Re-Enter password" id="password2" value = {password2} onChange = { onPwd2Change } />
                        </div> 
                    </div>
                    <br/>
                    <button className={`btn btn--primary ${styles.signup}`}>Signup</button>
                </form>
        </div>
    )
}