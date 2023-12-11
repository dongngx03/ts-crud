import React from 'react'
import { Link } from 'react-router-dom'
import BtnLogout from './BtnLogout'


const NavTop:React.FC = () => {
  const role = localStorage.getItem('userInfor');

  return (
    <div className='row bg-light p-3'>
        <div className="col-md-11">
            <ul className='d-flex w-100 justify-content-center gap-5 tw-h-full'>
                <li className='d-flex justify-content-center align-items-center'><Link className='text-decoration-none tw-text-gray-600' to='/'>Trang Chủ</Link></li>
                <li className='d-flex justify-content-center align-items-center'><Link className='text-decoration-none tw-text-gray-600' to='/product'>Sản Phẩm</Link></li>
                <li className='d-flex justify-content-center align-items-center'>
                  {
                    role == 'admin' ? <Link className='text-decoration-none tw-text-gray-600' to='/admin'>admin</Link> : ""
                  }
                </li>
                <li className='d-flex justify-content-center align-items-center'><Link className='text-decoration-none tw-text-gray-600' to='/'>Giỏ Hàng</Link></li>
                <li className='d-flex justify-content-center align-items-center'><Link className='text-decoration-none tw-text-gray-600' to='/signup'>Đăng Ký</Link></li>
                <li className='d-flex justify-content-center align-items-center'><Link className='text-decoration-none tw-text-gray-600' to='/signin'>Đăng nhập</Link></li>
                <li className='d-flex justify-content-center align-items-center'>
                  {
                    localStorage.length > 0 ? <BtnLogout /> : ""
                  }
                </li>
                
            </ul>
        </div>
    </div>
  )
}

export default NavTop