import { useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { signup } from '../../api/auth';
// @ts-ignore
export default function SignUp() {
    type FormValues = {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    };
    const resolver: Resolver<FormValues> = async (values: FormValues) => {
        return {
            values: values.firstName && values.lastName && values.email && values.password ? values : {},
            errors: values.firstName && values.lastName && values.email && values.password ? {} : {
                firstName: {
                    type: "required",
                    message: "First Name is required"
                },
                lastName: {
                    type: "required",
                    message: "Last Name is required"
                },
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
}
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver });
    const onSubmit = handleSubmit((data) => {
        signup(data)
        .then((res:any) => {
            console.log(res.data);
        })
    });
    return (
        <div className="signup container my-5">
            <form onSubmit={onSubmit}>
                <div className="d-flex mb-3">
                    <div className="form-floating col me-1">
                        <input type="text" className="form-control" id="firstName" placeholder="John"
                        {...register("firstName")}
                         />
                        <label htmlFor="firstName">First Name</label>
                        {errors?.firstName && <p className='fw-bold py-1 mb-0'>{errors.firstName.message}</p>}
                    </div>
                    <div className="form-floating col ms-1">
                        <input {...register("lastName")} type="text" className="form-control" id="lastName" placeholder="Doe" />
                        <label htmlFor="lastName">Last Name</label>
                        {errors?.lastName && <p className='fw-bold py-1 mb-0'>{errors.lastName.message}</p>}
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <input {...register("email")} type="email" className="form-control" id="email" placeholder="name@example.com" />
                    <label htmlFor="email">Email address</label>
                    {errors?.email && <p className='fw-bold py-1 mb-0'>{errors.email.message}</p>}
                </div>
                <div className="form-floating mb-3">
                    <input {...register("password")} type="password" className="form-control" id="password" placeholder="Password" />
                    <label htmlFor="password">Password</label>
                    {errors?.password && <p className='fw-bold py-1 mb-0'>{errors.password.message}</p>}
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="confirmPassword" />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                </div>
                <button type="submit" className="btn btn-primary col-12 py-2 mb-3">Sign Up</button>
            </form>
            <a href="/login" className='btn btn-secondary px-4 py-2'>Log In</a>
        </div>
    );
}
