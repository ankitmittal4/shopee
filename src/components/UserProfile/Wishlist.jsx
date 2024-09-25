import React, { useEffect, useState } from 'react';

import { fetchProducts } from '../../features/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../ProductList/ProductCard';
import Loader1 from '../Loaders/Loader1';






const Wishlist = () => {
 const dispatch = useDispatch();
  const { items, error, status } = useSelector((state) => state.products);
  const [products , setProducts] = useState([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (items && items.data && items.data.products) {
      setProducts(items.data.products);
    }
  }, [items, items.data]);


  // console.log(items)

  return (
    <>
    
    { status === "succeeded" ?(<div>
       <h2 className="text-lg">Account/Wish List</h2>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 z-50">
         {/* Mock wishlist items */}
         { products.map((product ,index)=>(
           <ProductCard key={index} product={product} />
         ))}
         {/* Repeat above div for each wishlist item */}
       </div>
     </div>):<div className="flex justify-center items-center h-96">
     <Loader1 />
   </div>
   }
    </>
  );
};

export default Wishlist;