import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { userRegister } from '../redux/features/authSlice';


const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error } = useSelector(state => ({ ...state.auth }));
    const [formValue, setFormValue] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const onHandleInput = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
    }

    const onHandleSubmit = () => {

        if (formValue.name === "" || formValue.email === "" || formValue.password === "" || formValue.confirmPassword === "") {
            return toast.error("One or more fields are empty");
        }
        if (formValue.password !== formValue.confirmPassword) {
            return toast.error("Password Mismatch");
        }
        dispatch(userRegister({ formValue, navigate, toast }));
        setFormValue({ ...formValue, name: "", email: "", password: "", confirmPassword: "" });
    }


    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error])
    return (
        <div>
            <div className="row justify-content-center mt-5 mt-5">
                <div className="col-md-5">
                    <div className="bs">
                        <h2>Register</h2>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="name"
                            name="name"
                            value={formValue.name}
                            onChange={onHandleInput}
                        />
                        <input
                            type="email"
                            className="form-control"
                            placeholder="email"
                            name="email"
                            value={formValue.email}
                            onChange={onHandleInput}
                        />
                        <input
                            type="password"
                            className="form-control"
                            placeholder="password"
                            name="password"
                            value={formValue.password}
                            onChange={onHandleInput}
                        />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="confirmPassword"
                            name="confirmPassword"
                            value={formValue.confirmPassword}
                            onChange={onHandleInput}
                        />
                        <button type="submit" className="btn btn-primary mt-3" onClick={onHandleSubmit}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register