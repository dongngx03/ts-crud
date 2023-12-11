import React from 'react'
import { Products } from '../interface'
import {Link} from "react-router-dom"


const ProductItem:React.FC<Products> = (props) => {
    const {_id, description, name, price} = props
   
  return (
    <div>
        <div className='d-flex flex-column justify-content-center align-items-center gap-2 bg-light rounded shadow-sm p-4'>
            <span>{_id}</span>
            <span>{description}</span>
            <span>{name}</span>
            <span>{price} $</span>
            <Link to={`/product/${_id}`} >Chi tiết sản Phẩm </Link>
        </div>
    </div>
  )
}

export default ProductItem