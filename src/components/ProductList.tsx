import React from 'react'
import { Products } from '../interface'
import ProductItem from './ProductItem';

interface Props {
    dataProduct: Products[];
}

const ProductList:React.FC<Props> = (props) => {
    const {dataProduct} = props;
  return (
    <div className='d-flex flex-wrap gap-5'>
        {
            dataProduct.map(data => {
                return(
                    <ProductItem 
                        key={data._id}
                        _id={data._id}
                        description = {data.description}
                        name={data.name}
                        price={data.price}
                    />
                )
            } )
        }
    </div>
  )
}

export default ProductList