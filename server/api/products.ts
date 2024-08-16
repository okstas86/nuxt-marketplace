import { defineEventHandler } from 'h3'
import { products } from '~/data/products'


export default defineEventHandler(() => {
  return products
});
