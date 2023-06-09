import { FC, ReactNode, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie'
import { CartContext, cartReducer } from './';
import { ICartProduct } from '@/interfaces';

interface Props {
  children: ReactNode
}

export interface CartState {
  cart: ICartProduct[];
}

const Cart_INITIAL_STATE : CartState = {
  cart: [],
}

export const CartProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(cartReducer, Cart_INITIAL_STATE)

  useEffect(() => {
    try {
      const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')! ): []
      dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts })
    } catch (error) {
      dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] })
    }
  }, [])
  

  useEffect(() => {
    Cookie.set('cart', JSON.stringify( state.cart ))
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


  return (
    <CartContext.Provider value={{
      ...state,

      addProductToCart,
      updateCartQuantity
    }}>
    { children }
    </CartContext.Provider>
  )
}