import { defineEventHandler, createError } from 'h3'
import { products } from '~/data/products'


export default defineEventHandler((event) => {

  const id = event.context.params?.id as string


  const product = products.find(p => p.id === id)

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found'
    })
  }

  return product
})
