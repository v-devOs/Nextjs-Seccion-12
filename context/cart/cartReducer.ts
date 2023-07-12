import { ICartProduct, ShippingAddress } from '@/interfaces';
import { CartState } from './';

type CartActionType = 
| { type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[] } 
| { type: '[Cart] - Update products in car', payload: ICartProduct[] } 
| { type: '[Cart] - Change cart quantity', payload: ICartProduct } 
| { type: '[Cart] - Remove product in cart', payload: ICartProduct } 
| { type: '[Cart] - Load address from cookies', payload: ShippingAddress } 
| { type: '[Cart] - Update shipping address', payload: ShippingAddress } 
| { 
    type: '[Cart] - Update order sumary', 
    payload: {
      numberOfItems: number;
      subtotal: number;
      tax: number;
      total: number;
    }
  }
| { type: '[Cart] - Order Complete'}

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

    case '[Cart] - Update shipping address':
    case '[Cart] - Load address from cookies':
      return{
        ...state,
        shippingAddress: action.payload
      }

    case '[Cart] - Order Complete':
      return{
        ...state,
        cart: [],
        numberOfItems: 0,
        subtotal: 0,
        tax: 0,
        total: 0
      }
    default:
      return state;
  }
}