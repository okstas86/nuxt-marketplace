
import { defineEventHandler, readBody } from 'h3'


interface CartItem {
  productId: string
  quantity: number
}


let cart: CartItem[] = []


export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (event.req.method === 'GET') {
  
    return cart
  }

  if (event.req.method === 'POST') {
    
    const { productId, quantity } = body

    const existingItem = cart.find(item => item.productId === productId)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({ productId, quantity })
    }

    return { success: true }
  }

  if (event.req.method === 'DELETE') {
    
    const { productId } = body
    cart = cart.filter(item => item.productId !== productId)
    return { success: true }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method Not Allowed'
  })
})
