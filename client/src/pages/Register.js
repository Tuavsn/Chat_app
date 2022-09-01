import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { loginRoute } from "../utils/APIRoutes";
import styled from 'styled-components';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({ 
        username: '', 
        password: '',
        confirmPassword: '',
        email: ''
    });
    const toastOptions = {
        position: "top-right",
        autoClose: 2000,
        pauseOnHover: false,
        draggable: true,
        theme: 'light',
        icon: '🚀'
    };
    useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
          navigate("/");
        }
    }, []);
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    const validateForm = () => {
        const { username, password, email } = values;
        if(username === '') {
            toast.error("Bạn chưa nhập tên tài khoản .", toastOptions);
            return false;
        } else if(password === '') {
            toast.error("Bạn chưa nhập mật khẩu .", toastOptions);
            return false;
        } else if(email === '') {
            toast.error("Bạn chưa nhập email", toastOptions);
            return false;
        }
        return true;
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(validateForm()) {
            const {username, password, email} = values;
            const {data} = await axios.post(loginRoute, {
                username,
                password,
                email
            })
            if(data.status === false) {
                toast.error(data.msg, toastOptions)
            }
            if(data.status === true) {
                localStorage.setItem(
                    process.env.REACT_APP_LOCALHOST_KEY,
                    JSON.stringify(data.user)
                );
            
                navigate('/');
            }
        }
    }
    return (
    <>
        <FormContainer>
            <form action='' onSubmit={(event) => handleSubmit(event)}>
                <h1 className="form__title">Tạo tài khoản</h1>
                <input 
                name='username'
                type="text"
                placeholder="Tên tài khoản"
                onChange={(e) => handleChange(e)}
                />
                <input 
                name='password'
                type="text"
                placeholder="Mật khẩu"
                onChange={(e) => handleChange(e)}
                />
                <input 
                name='email'
                type="text"
                placeholder="Email"
                onChange={(e) => handleChange(e)}
                />
                <button type="submit" className="form__btn">Tạo tài khoản</button>
                <span>
                    Bạn đã có tài khoản?<a href="/">Đăng nhập</a>
                </span>
            </form>
        </FormContainer>
        <ToastContainer progressStyle={
            {background: 
                'linear-gradient(120deg, #3ca7ee, #9b408f)'
            }
        } bodyStyle={
            {
                fontSize:'1.7rem',
            }
        }
        />
    </>
    )
}

const FormContainer = styled.div`
    font-family: 'Poppins', sans-serif;
    height: 100vh;
    background-image: linear-gradient(120deg, #3ca7ee, #9b408f);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    form {
        background-color: #fff;
        width: 40rem;
        border: none;
        border-radius: 1rem;
        padding: 4rem;
    }
    input {
        width: 100%;
        outline: none;
        border: none;
        height: 4rem;
        border-bottom: 2px solid #adadad;
        margin-top: 5rem;
        font-size: 1.7rem;
        font-weight: 700;
    }
    .form__title {
        text-align: center;
        font-size: 5rem;
        font-weight: bolder;
        margin:0;
        text-shadow: 1.5px 1.5px #adadad;
    }
    .form__btn {
        margin-top: 4.5rem;
        margin-bottom: 3.5rem;
        height: 6rem;
        width: 100%;
        border: none;
        border-radius: 2.5rem;
        outline: none;
        background-color: #3373c4;
        color: #fff;
        font-weight: 700;
        font-size: 2rem;
        cursor: pointer;
        transition: .5s;
    }
    .form__btn:hover {
        background-color: #08609a;
    }
    span {
        display:block;
        text-align: center;
        font-size: 1.3rem;
        font-weight: 600;
        color: rgba(0,0,0,.7);
    }
    span a {
        text-decoration: none;
        margin-left: .6rem;
    }
    span a:hover {
        opacity: ;
    }
`;

