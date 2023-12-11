import React, { useEffect, useState } from 'react'
import NavTop from '../components/NavTop'
import { DataSignUp } from '../interface';
import { useNavigate } from 'react-router-dom';


const SignUp:React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPw, setConfirmPw] = useState<string>('');

    const navigate = useNavigate();
    
    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
       
    }
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value.trim())
    }
    const handlePw = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value.trim())
    }
    const handleConfirmPw = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPw(e.target.value.trim())
    }

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // validate
        const data:DataSignUp  = {
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPw
        }
        
        try {
            const url:string = 'http://localhost:3000/api/auth/signup';
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            if(!res.ok) {
                throw new Error('gửi không thành công');
                
            }
            const dataUser = await res.json();
            console.log(dataUser);

            navigate('/signin')
            
            
        } catch (error) {
            console.log(error);
            
        }
       
    }

   
  return (
    <div className='container-fluid'>
        <NavTop />

        <h1 className='text-secondary text-center p-4'>Đăng ký Tài khoản </h1>
        <div>
            <form action="" onSubmit={handleSignUp}>
                <div className="mb-3">
                    <label htmlFor="">Tên Của bạn</label>
                    <input id='username' onChange={handleUsername} type="text" className='form-control' value={username} />
                    <span></span>
                </div>
                <div className="mb-3">
                    <label htmlFor="">Email</label>
                    <input id='email' type="email" onChange={handleEmail} className='form-control' value={email} />
                    <span></span>
                </div>
                <div className="mb-3">
                    <label htmlFor="">Mật khẩu</label>
                    <input id='pw' type="password" onChange={handlePw} className='form-control' value={password} />
                    <span></span>
                </div>
                <div className="mb-3">
                    <label htmlFor="">Xác Nhận Mật Khẩu</label>
                    <input id='confirmPw' type="password" onChange={handleConfirmPw} className='form-control' value={confirmPw} />
                    <span></span>
                </div>

                <div className="mb-3">
                    <button type='submit' className='btn btn-primary form-control'>Đăng ký </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp