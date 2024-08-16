import { defineEventHandler, readBody, createError } from 'h3'

interface CartItem {
  productId: string
  quantity: number
}


let cart: CartItem[] = []

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method === 'POST') {
    const body = await readBody(event)
    const { productId }: { productId: string } = body

    if (!productId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Product ID is required'
      })
    }

    const existingProductIndex = cart.findIndex(item => item.productId === productId)

    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += 1
    } else {
      cart.push({ productId, quantity: 1 })
    }

    return { success: true, cart }
  } else {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }
})
