import React, { useEffect, useState } from 'react'
import NavTop from '../components/NavTop'
import { FormikProduct, Products, Categories } from '../interface'
import TrProduct from '../components/TrProduct'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const Admin:React.FC = () => {
    const [product, setProduct] = useState<Products[]>([])
    const [category, setCategory] = useState<Categories[]>([])

    const navigate = useNavigate()
    

   const formik = useFormik<FormikProduct>({
        initialValues: {
            name: '',
            price: 0,
            description: '',
            categoryId: '6576c36c1530d9dc0a8eac1e'
        }, 
        validationSchema: Yup.object({
            name: Yup.string().required("Không được để trống").min(5, "độ dài ký tự chưa đủ"),
            price: Yup.number().required("không được để trống ").min(5, "giá tiền không hợp lệ"),
            description: Yup.string().required("không được để trống phần mô tả").min(10, "độ dài mô tả chưa hơp lệ")
            // muốn sử dung regex vào làm điều kiện cho yup check thì dặt regex bạn bần nằm trong hàm matches(/ ...regex.. /)
        }),
        onSubmit: async (values):Promise<void> => {
          // Xử lý submit form
          console.log('đã ok');
          console.log(values);
          // gửi dữ liệu lên sever
          try {
            const token = localStorage.getItem('token')
            const url = 'http://localhost:3000/api/product/';
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(values)
            })
            const data = await res.json();
            console.log(data);
            if(data.name == "JsonWebTokenError") {
                Swal.fire({
                    title: 'Xin Lỗi',
                    text: 'Bạn chưa đủ tuổi đê làm việc này !',
                    icon: 'warning',
                    confirmButtonText: 'OK',
                  });
            }else if(data.message =="Bạn không có quyền làm việc này") {
                Swal.fire({
                    title: 'Xin Lỗi',
                    text: 'Bạn chưa đủ tuổi đê làm việc này bởi bạn là dân thường!',
                    icon: 'warning',
                    confirmButtonText: 'OK',
                  });
            }else{
                Swal.fire({
                    title: 'Thành Công',
                    text: 'Tạo sản phẩm mới thành công ',
                    icon: 'success',
                    confirmButtonText: 'OK',
                  }).then((result) => {
                    if(result) {
                        navigate('/product')
                    }
                  });
            }

            
          } catch (error) {
            console.log(error);
            window.alert('không thành công')
            
          }
          
        },
       
   })

//    console.log(formik.values);
   

    // lấy dữ liệu về 
    useEffect(() => {
        const getProductAll = async ():Promise<void> => {
            const url:string = 'http://localhost:3000/api/product/';
            try {
                const res = await fetch(url);
               
                const dataProduct = await res.json();
                console.log(dataProduct);
                setProduct(dataProduct.data)

            } catch (error) {
                console.log(error);
                
            }
        }
        const getCategoryAll = async ():Promise<void> => {
            const url:string = 'http://localhost:3000/api/category/';
            try {
                const res = await fetch(url);

                const data = await res.json();
                console.log(data);
                setCategory(data.data)
                
            } catch (error) {
                console.log(error);
                
            }
        }

        getProductAll();
        getCategoryAll()
    }, [])

    console.log(product);
    console.log(category);
    
    
  return (
    <div className='container-fluid'>
        <NavTop />
        <h1 className='text-secondary text-center p-4'>quản lý sản phẩm </h1>

        <table className='table mt-3 text-center aligin-items-center'>
            <thead>
                <tr>
                    <th>ID sản phẩm </th>
                    <th>Tên sản phẩm  </th>
                    <th>Giá sản phẩm  </th>
                    <th>Mô tả  </th>
                    <th>Chức năng</th>
                </tr>
            </thead>
            <TrProduct products = {product} />
        </table>


        <div className='row'>
            <form action="" onSubmit={formik.handleSubmit}>
                <h1 className='p-3'>Thêm Sản Phẩm </h1>
                <div className='mb-3'>
                    <label htmlFor="">Tên sản Phẩm </label>
                    <input 
                        type="text" 
                        id='name'
                        name='name'
                        className='form-control'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        placeholder='Nhập tên sản phẩm muốn thêm '
                    /> 
                    {
                        formik.errors.name && (
                            <p className='text-danger'>{formik.errors.name}</p>
                        )
                    }
                </div>
                <div className='mb-3'>
                    <label htmlFor="">Giá tiền </label>
                    <input
                        type="number" 
                        className='form-control'
                        id='price'
                        name='price'
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        placeholder='nhập giá sản phẩm '
                     /> 
                    {
                        formik.errors.price && (
                            <p className='text-danger'>{formik.errors.price}</p>
                        )
                    }
                </div>
                <div className='mb-3'>
                    <label htmlFor="">Mô tả  </label>
                    <input
                        type="text" 
                        className='form-control'
                        id='description'
                        name='description'
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        placeholder='nhập mô tả sản phẩm '
                    /> 
                    {
                        formik.errors.description && (
                            <p className='text-danger'>{formik.errors.description}</p>
                        )
                    }
                </div>

                <select name="" id="">
                    {
                        category.map((category) => {
                            return(
                                <option value={category._id}>{category.name}</option>
                            )
                        })
                    }
                </select>

                <div className="mb-3">
                    <button className='btn btn-danger form-control'>Thêm sản phẩm </button>
                </div>

            </form>
        </div>
        
    </div>
  )
}

export default Admin