import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react';

function Signin() {

    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            navigate('/todo')
        }
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
        const isPasswordValid = pwd.length >= 8;
        setIsButtonDisabled(!(isEmailValid && isPasswordValid));
    };

    async function handleSubmit() {
        const data = {
          email: email,
          password: pwd
        };
        
        const url = 'https://www.pre-onboarding-selection-task.shop/auth/signin';
        
        try {
          const response = await axios.post(url, data);
          localStorage.setItem('token',response.data.access_token)
          navigate('/todo')
        } catch (error) {
          console.error('에러 발생:', error);
        }
    }
      

    return(
        <div>
            <div>
                로그인
            </div>
            <div>
                <label>이메일:</label>
                <input 
                    data-testid="email-input"
                    placeholder='아이디 입력'
                    onChange={onChangeEmail}/>
                <label>비밀번호:</label>
                <input data-testid="password-input" 
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
