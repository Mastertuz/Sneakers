import { useContext } from "react"
import { AppContext } from "../App"
import React from 'react'

export const useCart = ()=>{
    const {cartItems,setCartItems} = useContext(AppContext)
    const totalPrice = cartItems.reduce((sum,item)=>item.price+sum,0)
    return {cartItems,setCartItems,totalPrice}
}
