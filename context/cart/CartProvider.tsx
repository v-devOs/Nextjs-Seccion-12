import { FC, ReactNode, useEffect, useReducer } from 'react';
import Cookies from 'js-cookie'
import { CartContext, cartReducer } from './';
import { ICartProduct, IOrder, ShippingAddress } from '@/interfaces';
import { tesloApi } from '@/api';
import axios from 'axios';

interface Props {
  children: ReactNode
}

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subtotal: number;
  tax: number;
  total: number;

  shippingAddress?: ShippingAddress
}



const Cart_INITIAL_STATE : CartState = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subtotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined
}

export const CartProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(cartReducer, Cart_INITIAL_STATE)

  useEffect(() => {
    try {
        const cookieCart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : [];
        dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieCart })
    } catch (error) {
        dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] })
    }
  }, [])

  useEffect(() => {

    if( Cookies.get('firstName')){

      const shippingAddress: ShippingAddress = {
        firstName: Cookies.get('firstName') || '',
        lastName:  Cookies.get('lastName') || '',
        address:   Cookies.get('address') || '',
        address2:  Cookies.get('address2') || '',
        zip:       Cookies.get('zip') || '',
        city:      Cookies.get('city') || '',
        country:   Cookies.get('country') || '',
        phone:     Cookies.get('phone') || '',
      }
  
      dispatch({ type: '[Cart] - Load address from cookies', payload: shippingAddress})
    }

  }, [])
  

  useEffect(() => {
    Cookies.set('cart', JSON.stringify(state.cart))
  }, [state.cart]);

  useEffect(() => {

    const numberOfItems = state.cart.reduce( ( prev, current ) => current.quantity + prev, 0)
    const subtotal = state.cart.reduce( ( prev, current ) => ( current.price * current.quantity ) + prev ,0)
    const taxRate = Number( process.env.NEXT_PUBLIC_TAX_RATE || 0 )

    const orderSumary = {
      numberOfItems,
      subtotal,
      tax: subtotal * taxRate,
      total: (subtotal * taxRate) + subtotal
    }
    
    dispatch({type: '[Cart] - Update order sumary', payload: orderSumary})
  }, [state.cart])
  

  const addProductToCart = ( product: ICartProduct ) => {

    const productInCart = state.cart.some( p => p._id === product._id)
    if( !productInCart ) return dispatch({ type: '[Cart] - Update products in car', payload: [...state.cart, product]})

    const productInCartButDifferentSize = state.cart.some( p => p._id === product._id && p.size === product.size )
    if( !productInCartButDifferentSize ) return dispatch({type: '[Cart] - Update products in car', payload: [...state.cart, product]})
    
    const updatedProducts = state.cart.map( p => {

      if( p._id === product._id && p.size === product.size ){
        p.quantity += product.quantity
      }

      return p;
    })

    dispatch({type: '[Cart] - Update products in car', payload: updatedProducts})
  }


  const updateCartQuantity = ( product: ICartProduct ) => {
    dispatch({type: '[Cart] - Change cart quantity', payload: product })
  }

  const removeCartProduct = ( product: ICartProduct ) => {
    dispatch({type: '[Cart] - Remove product in cart', payload: product})
  }

  const updateAddress = ( address: ShippingAddress ) => {
    Cookies.set("firstName", address.firstName)
    Cookies.set("lastName", address.lastName)
    Cookies.set("address", address.address)
    Cookies.set("address2", address.address2 || '')
    Cookies.set("zip", address.zip)
    Cookies.set("city", address.city)
    Cookies.set("country", address.country)
    Cookies.set("phone", address.phone)
    dispatch({type: '[Cart] - Update shipping address', payload: address})
  }

  const createOrder = async(): Promise<{ hasError: boolean, message: string}> => {
    
    if( !state.shippingAddress ){
      throw new Error('No hay direccion de entrega')
    }

    const body: IOrder = {
      orderItems: state.cart.map( p => ({
        ...p,
        size: p.size!
      })),
      shippingAddress: state.shippingAddress,
      numberOfItems: state.numberOfItems,
      subtotal: state.subtotal,
      total: state.total,
      tax: state.tax,
      isPaid: false
    }

    try {
      const { data } = await tesloApi.post<IOrder>('/orders', body)
      
      dispatch({ type: '[Cart] - Order Complete' })

      return {
        hasError: false,
        message: data._id!
      }

    } catch (error) {
      if( axios.isAxiosError(error)){
        return { hasError: true, 
          message: error.response?.data.message
        }
      }

      return {
        hasError: true,
        message: 'Error no controlado hable con el administrador'
      }
    }

  }


  return (
    <CartContext.Provider value={{
      ...state,

      addProductToCart,
      updateCartQuantity,
      removeCartProduct,
      updateAddress,
      createOrder
    }}>
    { children }
    </CartContext.Provider>
  )
}