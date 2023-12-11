import React, { useEffect, useState } from 'react'
import NavTop from '../components/NavTop'
import { Products } from '../interface';
import ProductList from '../components/ProductList';



const Product:React.FC = () => {
    const [product, setproduct] = useState<Products[]>([]);

    // lấy sản phẩm 
    useEffect(() => {
        const getProduct = async () => {
            const url:string = 'http://localhost:3000/api/product/';
            const res = await fetch(url);

            const dataProduct = await res.json();
            
            // console.log(dataProduct);

        //    dataProduct.data.forEach((data:Products) => {
        //         setproduct((product) => {
                   
        //             return [...product, data]
        //         })
        //    })
            setproduct(dataProduct.data)
        
        }

        getProduct()

    },[])

    console.log(product);

  return (
    <div className='container-fluid'>
        <NavTop />
        <h1 className='text-center tw-text-gray-500 p-5'>Đây là trang sản phẩm </h1>
        <div>
            <ProductList dataProduct={product} />
        </div>
        
        
    </div>
  )
}

export default Product