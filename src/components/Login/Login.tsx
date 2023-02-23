import { useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { login } from '../../api/auth';
import { useAuth } from '../../contexts/AuthProvider';
import './Login.css';
import { useCookies } from 'react-cookie';


// @ts-ignore
export default function Login() {
    const [error, setError] = useState('');
    const [cookie, setCookie]=useCookies(['token']);
    type FormValues = {
        email: string;
        password: string;
    };
    const resolver: Resolver<FormValues> = async (values) => {
        return {
            values: values.email && values.password ? values : {},
            errors: values.email && values.password ? {} : {
                email: {
                    type: "required",
                    message: "Email is required"
                },
                password: {
                    type: "required",
                    message: "Password is required"
                }
            }

        };
    };
    const { onLogin } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
    const onSubmit = handleSubmit(async (data) => {
        login(data.email, data.password).then((res:any) => {
            if(res.data.error){
                setError(res.data.error.message);
            }
            else{
                setCookie('token',res.headers.authorization,{ path: '/', maxAge: 86400 })
                onLogin(res.data);
            }
        })
    });

    return (
        <div className="login container py-5">
            {error && <span className='bg-white py-1 px-2 border rounded fw-bold text-danger my-5'>{error}</span>}
            <form onSubmit={onSubmit} className='mt-3'>
                <div className="form-floating mb-3">
                    <input {...register("email")} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                    {errors?.email && <p className=''>{errors.email.message}</p>}
                </div>


                <div className="form-floating">
                    <input {...register("password")} type="password" className="form-control" id="floatingPassword" placeholder="Password"  />
                    <label htmlFor="floatingPassword">Password</label>
                    {errors?.password && <p className=''>{errors.password.message}</p>}
                </div>

                <button className="btn btn-primary mt-3 col-12 mb-3 py-2" type="submit">Login</button>
            </form>
            <a href="/signup" className='btn btn-secondary fw-bold px-3 text-white text-capitalize py-2'>Sign up</a>
        </div>
    );
}
