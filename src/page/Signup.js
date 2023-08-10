import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

function Signup() {

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
            url:`https://www.pre-onboarding-selection-task.shop/auth/signup`,
            method:'post',
            headers: {
                "Content-Type": `application/json`,
            },
            data: {
                email: email,
                password: pwd
            }
        }).then(res=>{
            navigate('/signin')
        }).catch(err=>{
            console.error('에러 발생:', err);
            alert(err.response.data.message)
        })
    }

    return(
        <div className='signup'>
            <h1>회원가입</h1>
            <div>
                <Link to="/signin">로그인</Link>
                <Link to="/">대시보드</Link>
            </div>
            <div className='form'>
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
                {!isButtonDisabled ? null :
                <p>
                    *이메일 조건: @포함<br></br>
                    *비밀번호 조건: 8자 이상
                </p>}
            </div>
        </div>
    )
    
}

export default Signup;
