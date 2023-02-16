import { useState } from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import './Login.css';

// @ts-ignore
export default function Login() {
    const { onLogin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await onLogin({ email, password });
    };
    return (
        <div className="login container py-5">
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)}/>
                        <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="btn btn-primary mt-3 col-12 mb-3 py-2" type="submit">Login</button>
            </form>
            <a href="/signup" className='btn btn-secondary p-2'>Sign up</a>
        </div>
    );
}
