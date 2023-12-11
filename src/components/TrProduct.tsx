import React from 'react'
import { Products } from '../interface'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


interface products {
    products : Products[]
}

const TrProduct:React.FC<products> = (props) => {
    const {products} = props
    const navigate = useNavigate();

    const deleteProduct = async (e: React.MouseEvent<HTMLButtonElement>):Promise<void> => {
        const productID = e.currentTarget.dataset.id;

        try {
            const url = `http://localhost:3000/api/product/${productID}`;
            
            const res = await axios.delete(url);

            console.log(res.data);
            if(res.data.message =="xóa sản phẩm thành công ") {
                Swal.fire({
                    title: 'Thành Công',
                    text: 'xóa sản phẩm mới thành công ',
                    icon: 'success',
                    confirmButtonText: 'OK',
                  }).then((result) => {
                    if(result) {
                        navigate('/product')
                    }
                  });
            }
            navigate('/admin')
            
        } catch (error) {
            console.log(error);
            
        }   
    }

  return (
    <>
        <tbody>
           {
            products.map((p) => {
                return(
                    <tr>
                        <td>{p._id}</td>
                        <td>{p.name}</td>
                        <td>{p.price}</td>
                        <td>{p.description}</td>
                        <td>
                            <div className='d-grid gap-2'>
                                <button onClick={deleteProduct} className='btn btn-danger' data-id={p._id}>Xóa Sản Phẩm </button>
                                <button className='btn btn-primary' data-id={p._id} >sửa sản phẩm  </button>
                            </div>
                        </td>
                    </tr>
                )
            })
           }
        </tbody>
       
    </>
  )
}

export default TrProduct