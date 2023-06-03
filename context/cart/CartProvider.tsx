import { FC, ReactNode, useReducer } from 'react';
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


  return (
    <CartContext.Provider value={{
      ...state,

      addProductToCart
    }}>
    { children }
    </CartContext.Provider>
  )
}