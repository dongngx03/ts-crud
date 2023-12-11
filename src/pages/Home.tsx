import React from 'react'
import NavTop from '../components/NavTop'

const Home:React.FC = () => {
  return (
    <div className='container-fluid'>
        <NavTop />
        <div className="row p-5">
            <h1 className='text-center text-secondary'>Xin chào tất cả các bạn đây là trang web đầu tiên </h1>
            
        </div>
    </div>
  )
}

export default Home