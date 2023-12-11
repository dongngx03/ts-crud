import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavTop from '../components/NavTop';
import { Products } from '../interface';
import axios from 'axios';

const ProductDetail:React.FC = () => {
    // lấy url 
    const {productid} = useParams();
    console.log(productid);

    const [productDetail, setProductDetail] = useState<Products>(Object);
    
    useEffect(() => {
        const loadDetail = async () => {
            const url:string = `http://localhost:3000/api/product/${productid}` 
            const res = await axios.get(url)

            console.log(res.data);
            setProductDetail(res.data.datas)
            
        }
        loadDetail();
    }, [])

    console.log(productDetail);
    
  return (
    <div className='container-fluid'>
        <NavTop />
        <h1>Chi tiết Sản Phẩm id = {productid}</h1>

        <div className='row mt-5 p-5'>
           <h3>id sản Phẩm: {productDetail._id}</h3>
           <h3>chú thích:  {productDetail.description}</h3>
           <h3>tên áo : {productDetail.name}</h3>
           <h3> Giá tiền: {productDetail.price} $</h3>
         
        </div>
    </div>
  )
}

export default ProductDetail