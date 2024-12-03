import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct] = useState(false) //kiem soat hienthi compen
  const [allProduct,setAllProduct] = useState([]) // luu danh sach

  const fetchAllProduct = async() =>{ // lay danh sach all sp
    const response = await fetch(SummaryApi.allProduct.url) // yêu cầu GET đến API được định
    const dataResponse = await response.json() // chuyen sang dang json

    console.log("product data",dataResponse) // hien thi ra

    setAllProduct(dataResponse?.data || [])
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])
  // hien thi san pham
  return (
    <div>
        <div className='bg-white py-2 px-4 flex justify-between items-center'>
            <h2 className='font-bold text-lg'>Tất cả sản phẩm</h2>
            <button  className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={()=>setOpenUploadProduct(true)}>
              Cập nhật sản phẩm
            </button>
        </div>
        {/** goi ham userState de chuyen hien thi sang compen upload pro */}
        {/**all product */}
        <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
          {
            allProduct.map((product,index)=>{
              return(
                <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>
                
              )
            })
          }
        </div>
          {/** goi ham fetchAllProduct de chuyen hien thi sang compen update pro */}
        {/**upload prouct component */}
        {
          openUploadProduct && (
            <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
          )
        }
      

    </div>
  )
}

export default AllProducts