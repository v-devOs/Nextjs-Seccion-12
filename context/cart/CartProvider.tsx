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

  return (
    <CartContext.Provider value={{
      ...state
    }}>
    { children }
    </CartContext.Provider>
  )
}