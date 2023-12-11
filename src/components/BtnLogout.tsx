import React from 'react'
import { useNavigate } from 'react-router-dom';

const BtnLogout:React.FC = () => {
    const navigate = useNavigate();
    const logout = ():void => {
        localStorage.clear();
        navigate('/signin')
    }
  return (
    <div>
        <button onClick={logout} className='btn btn-danger'>Đăng xuất </button>
    </div>
  )
}

export default BtnLogout