import React from 'react'
import Homeoffer from "../components/homepage/homeoffer";
import ProductList from "../components/Product/ProductList";
import Homepage from "../components/homepage/homepage";
import Homecategory from './homepage/homecategory';

function Home() {
  return (
  <>
    <Homecategory/>
    <Homepage/>
    <Homeoffer/>
    <ProductList/>
  </>
  )
}

export default Home