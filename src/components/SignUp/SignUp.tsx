import { useState } from 'react';
import { Supabase } from '../../api/supabase';

// @ts-ignore
export default function SignUp() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const base = new Supabase();
        const response = await base.signUp({ email: username, password });
        console.log(response);
    };
    return (
        <div className="signup container my-5">
            <form onSubmit={handleSubmit}>
                <div className="d-flex mb-3">
                    <div className="form-floating col me-1">
                        <input type="email" className="form-control" id="firstName" placeholder="John" />
                        <label htmlFor="firstName">First Name</label>
                    </div>
                    <div className="form-floating col ms-1">
                        <input type="password" className="form-control" id="lastName" placeholder="Doe" />
                        <label htmlFor="lastName">Last Name</label>
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={(e) => setUserName(e.target.value)}/>
                    <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    <label htmlFor="password">Password</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                </div>
                <button type="submit" className="btn btn-primary col-12 py-2 mb-3">Sign Up</button>
            </form>
            <a href="/login" className='btn btn-secondary p-2'>Log In</a>
        </div>
    );
}
