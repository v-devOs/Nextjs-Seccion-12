import { FC } from "react"
import { Slide } from "react-slideshow-image"


import styles from './ProductSlideshow.module.css'

interface Props{
  images: string[]
}

export const ProductSlideshow:FC<Props> = ({ images }) => {

  console.log(images);
  
  return (
    <Slide
      easing="ease"
      duration={7000}
      indicators
    >
      {
        images.map( image => {
          const url = `http://localhost:3000/products/${image}`

          console.log({url,name:  'url image'});
          
          
          return (
            <div className={styles['each-slide']} key={image}>
              <div style={{
                backgroundImage: `url(${url})`,
                backgroundSize: 'cover'
              }}>

              </div>
            </div>
          )

        })
      }
    </Slide>
  )
}
