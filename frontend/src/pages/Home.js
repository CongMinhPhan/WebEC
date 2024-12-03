import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  // tra ve
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>


      <VerticalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
      <VerticalCardProduct category={"watches"} heading={"Popular's Watches"}/>

      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"}/>
      <VerticalCardProduct category={"Mouse"} heading={"Mouse"}/>
      <VerticalCardProduct category={"televisions"} heading={"Televisions"}/>
      <VerticalCardProduct category={"camera"} heading={"Camera & Photography"}/>
      <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"}/>
      
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"}/>
      
    </div>
  )
}

export default Home