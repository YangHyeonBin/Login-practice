import React, { useEffect, useState } from 'react';

const User = {
  name: 'ekil',
  email: 'ekil@example.com',
  password: 'q1w2e3!@',
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const [passwordHasEnglish, setPasswordHasEnglish] = useState(false);
  const [passwordHasNumber, setPasswordHasNumber] = useState(false);
  const [passwordHasSpecialCharacter, setPasswordHasSpecialCharacter] =
    useState(false);
  const [passwordLengthCheck, setPasswordLengthCheck] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (emailIsValid && passwordIsValid) {
      setIsDisabled(false);
      return;
    }
    setIsDisabled(true);
  }, [emailIsValid, passwordIsValid]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    // 정규표현식 이용해 유효성 검사
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    // 정규표현식 이용해 유효성 검사
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }

    const engRegex = /^(?=.*?[a-zA-z]).{1,20}$/;
    if (engRegex.test(e.target.value)) {
      setPasswordHasEnglish(true);
    } else {
      setPasswordHasEnglish(false);
    }

    const numRegex = /^(?=.*?[0-9]).{1,20}$/;
    if (numRegex.test(e.target.value)) {
      setPasswordHasNumber(true);
    } else {
      setPasswordHasNumber(false);
    }

    const specialCharRegex = /^(?=.*?[$`~!@$!%*#^?&\\(\\)\-_=+]).{1,20}$/;
    if (specialCharRegex.test(e.target.value)) {
      setPasswordHasSpecialCharacter(true);
    } else {
      setPasswordHasSpecialCharacter(false);
    }

    const lengthValidRegex =
      /^(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (lengthValidRegex.test(e.target.value)) {
      setPasswordLengthCheck(true);
    } else {
      setPasswordLengthCheck(false);
    }

    // 조건 만족하자마자 반영 X (state의 비동기적 처리 때문인 듯)
    // if (
    //   passwordHasSpecialCharacter &&
    //   passwordHasNumber &&
    //   passwordHasEnglish &&
    //   passwordLengthCheck
    // ) {
    //   setPasswordIsValid(true);
    // } else {
    //   setPasswordIsValid(false);
    // }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (email === User.email && password === User.password) {
      alert(`${User.name}, 환영합니다!`);
    } else {
      alert('등록되지 않은 회원입니다.');
    }
  };

  return (
    <div className='login-wrapper'>
      <h1 className='login-title'>
        이메일과 비밀번호를
        <br />
        입력해주세요
      </h1>
      <form onSubmit={formSubmitHandler}>
        <div className='input-container-wrapper'>
          <div className='input-box-container'>
            <label htmlFor='email'>이메일 주소</label>
            <div className='input-box'>
              <input
                type='email'
                placeholder='test@gmail.com'
                id='email'
                value={email}
                onChange={handleEmail}
              />
            </div>
            {email.length > 0 && !emailIsValid && (
              <p className='valid-check-message'>
                올바른 이메일을 입력해주세요.
              </p>
            )}
          </div>
          <div className='input-box-container'>
            <label htmlFor='password'>비밀번호</label>
            <div className='input-box'>
              <input
                type='password'
                placeholder='비밀번호'
                id='password'
                value={password}
                onChange={handlePassword}
              />
            </div>
            {password.length > 0 && !passwordIsValid && (
              <div className='valid-check-container'>
                <p className='valid-check-message'>
                  영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
                </p>
                <span className={passwordHasEnglish ? 'valid' : ''}>
                  ✔️ 영문
                </span>
                <span className={passwordHasNumber ? 'valid' : ''}>
                  ✔️ 숫자
                </span>
                <span className={passwordHasSpecialCharacter ? 'valid' : ''}>
                  ✔️ 특수문자
                </span>
                <span className={passwordLengthCheck ? 'valid' : ''}>
                  ✔️ 8자 이상
                </span>
              </div>
            )}
          </div>
        </div>
        <button className='confirm-button' disabled={isDisabled}>
          확인
        </button>
      </form>
    </div>
  );
}
