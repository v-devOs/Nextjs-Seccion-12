import { IUser } from "./IUser";


export interface IOrder{
  _id?: string,
  user?: IUser | string
  orderItems: IOrderItem[]
  shippingAddress: ShippingAddress
  paymentResult?: string

  numberOfItems: number
  subtotal:         number
  tax:        number
  total:        number

  isPaid: boolean
  paidAt: string
}


export interface IOrderItem{
  _id:      string
  title:    string,
  size:     string
  quantity: number,
  slug:     string,
  image:    string
  prize:    number
}

export interface ShippingAddress{
  firstName: string,
  lastName:  string,
  address:   string,
  address2?: string,
  zip:       string,
  city:      string,
  country:   string,
  phone:     string,
}