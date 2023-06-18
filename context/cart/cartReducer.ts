import { ICartProduct } from '@/interfaces';
import { CartState } from './';

type CartActionType = 
| { type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[] } 
| { type: '[Cart] - Update products in car', payload: ICartProduct[] } 
| { type: '[Cart] - Change cart quantity', payload: ICartProduct } 
| { type: '[Cart] - Remove product in cart', payload: ICartProduct } 
| { 
    type: '[Cart] - Update order sumary', 
    payload: {
      numberOfItems: number;
      subtotal: number;
      tax: number;
      total: number;
    }
  }

export const cartReducer = ( state: CartState, action: CartActionType ): CartState => {
  
  switch (action.type) {
    case '[Cart] - LoadCart from cookies | storage':
      return{
        ...state,
        cart: action.payload,
        isLoaded: true
      }
    
    case '[Cart] - Update products in car':
      return{
        ...state,
        cart: action.payload
      }
    
      
    case '[Cart] - Change cart quantity':
      return{
        ...state,
        cart: state.cart.map( p => {

          if( p._id === action.payload._id && p.size === action.payload.size ){
            p.quantity = action.payload.quantity
          }

          return p;
        })
      }

    case '[Cart] - Remove product in cart':
      return{
        ...state,
        cart: state.cart.filter( p => !(p._id === action.payload._id && p.size === action.payload.size))
      }

    case '[Cart] - Update order sumary':
      return{
        ...state,
        ...action.payload
      }

    default:
      return state;
  }
}