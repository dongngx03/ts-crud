import React, { useState } from 'react';
import NavTop from '../components/NavTop';
import { useNavigate } from 'react-router-dom';
import MessSignInSuccess from '../components/MessSignInSuccess';
interface DataSignIn {
    email: string;
    password:string;
}

const SignIn: React.FC = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [mess, setMessage] = useState<boolean>(false)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.trim());
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.trim());
  };

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Sử dụng biến email và password ở đây để gửi yêu cầu đăng nhập hoặc xử lý logic tương ứng
      console.log('Email:', email);
      console.log('Password:', password);

      const data:DataSignIn = {
        email: email,
        password: password
      }
      console.log(JSON.stringify(data));
      
      const url = "http://localhost:3000/api/auth/signin";
      const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      

      if (!res.ok) {
        throw new Error('Lỗi mạng không gửi được');
      }

      

      const dataRes = await res.json();
      console.log(dataRes.accessToken);
      const token:string = dataRes.accessToken;
      const role:string = dataRes.userInfor.role;

      console.log(dataRes);
      

      // lưu token vào localStrorage
      if(dataRes.accessToken != undefined) {
        localStorage.setItem('token',token)
        localStorage.setItem('userInfor', role)
        setMessage(true)

        navigate('/')
      }

      
      
      
    } catch (error) {
      console.log(error);
    }
  };
//   localStorage.clear();
  console.log(localStorage);
//   console.log(email);
//   console.log(password);
  
  return (
    <div className='container-fluid'>
      <NavTop />
      <h1 className='text-center text-secondary p-4'>Đây là Trang Đăng nhập</h1>
        {
            mess ? <MessSignInSuccess /> : ""
        }
      <div>
        <form onSubmit={signIn} className='p-5 d-flex gap-1 flex-column form'>
          Email: <input
            className='form-control'
            type="text"
            value={email}
            onChange={handleEmailChange}
          /><br />
          Password: <input
            className='form-control'
            type="password"
            value={password}
            onChange={handlePasswordChange}
          /><br />
          <button className='btn btn-secondary' type='submit'>Đăng Nhập</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
