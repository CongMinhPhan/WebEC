import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'

const SearchProduct = () => {
  
    const query = useLocation() // Lay thong tin tai URL hien tai
    const [data, setData] = useState([]) // lưu trữ danh sách sản phẩm
    const [loading, setLoading] = useState(false) // theo doi trang thai du lieu

    console.log("query", query.search)

    const fetchProduct = async()=>{
        setLoading(true)
        const response = await fetch(SummaryApi.searchProduct.url+query.search) // Gọi API tìm kiếm sản phẩm
        const dataResponse = await response.json() // Chuyển đổi phản hồi JSON
        setLoading(false) // Kết thúc tải dữ liệu

        setData(dataResponse.data) // Lưu dữ liệu sản phẩm vào state
    }

    useEffect(() => {
        fetchProduct() // chuyen ham goi API
    }, [query])

  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Loading ...</p>
        )
      }
 
      <p className='text-lg font-semibold my-3'>Kết quả tìm kiếm : {data.length}</p>

      {
        data.length === 0 && !loading && (
           <p className='bg-white text-lg text-center p-4'>Không tìm thấy....</p>
        )
      }


      {
        data.length !==0 && !loading && (
          <VerticalCard loading={ loading} data={data}/>
        )
      }

    </div>
  )
}
// hien thi duoi dang VerticalCard
export default SearchProduct