import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"

function Signin() {

    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            navigate('/todo')
        }// eslint-disable-next-line
    }, [])

    function onChangeEmail (e) {
        setEmail(e.target.value)
        handleInputChange()
    }

    function onChangePwd (e) {
        setPwd(e.target.value)
        handleInputChange()
    }

    const handleInputChange = () => {
        const isEmailValid = email.includes('@');
        const isPasswordValid = pwd.length > 7;
        setIsButtonDisabled(!(isEmailValid && isPasswordValid));
    };

    function handleSubmit() {
        axios({
            url:`https://www.pre-onboarding-selection-task.shop/auth/signin`,
            method:'post',
            headers: {
                "Content-Type": `application/json`,
            },
            data: {
                email: email,
                password: pwd
            }
        }).then(res=>{
            localStorage.setItem('token',res.data.access_token)
            navigate('/todo')
        }).catch(err=>{
            console.error('에러 발생:', err);
            alert(err.response.data.message)
        })
    }
      

    return(
        <div className='signin'>
            <h1>로그인</h1>
            <div>
                <Link to="/">대시보드</Link>
                <Link to="/signup">회원가입</Link>
            </div>
            <div className='form'>
                <label>이메일:</label>
                <input 
                    data-testid="email-input"
                    placeholder='아이디 입력'
                    onChange={onChangeEmail}/>
                <label>비밀번호:</label>
                <input 
                    type='password'
                    data-testid="password-input" 
                    placeholder='비밀번호 입력'
                    onChange={onChangePwd}/>
                <button 
                    data-testid="signin-button"
                    disabled={isButtonDisabled}
                    onClick={handleSubmit}>
                    로그인
                </button>
            </div>
        </div>
    )
}

export default Signin;
