import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { userLogin } from '../redux/features/authSlice';


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error } = useSelector(state => ({ ...state.auth }));
    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
    })

    const onHandleInput = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
    }

    const onHandleSubmit = () => {

        if (formValue.email === "" || formValue.password === "") {
            return toast.error("One or more fields are empty");
        }
        dispatch(userLogin({ formValue, navigate, toast }));
        setFormValue({ ...formValue,email: "", password: ""});
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
                        <h2>Login</h2>
                        
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
                       
                        <button type="submit" className="btn btn-primary mt-3" onClick={onHandleSubmit}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;