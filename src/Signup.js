import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"

function Signup() {

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
        const isPasswordValid = pwd.length > 7;
        setIsButtonDisabled(!(isEmailValid && isPasswordValid));
    };

    async function handleSubmit() {
        const data = {
          email: email,
          password: pwd
        };
        
        const url = 'https://www.pre-onboarding-selection-task.shop/auth/signup';
        
        try {
          const response = await axios.post(url, data);
          console.log(response)
          navigate('/signin')
        } catch (error) {
          console.error('에러 발생:', error);
        }
      }

    return(
        <div>
            <div>
                회원가입
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
                    data-testid="signup-button"
                    disabled={isButtonDisabled}
                    onClick={handleSubmit}>
                    회원가입
                </button>
            </div>
        </div>
    )
    
}

export default Signup;
