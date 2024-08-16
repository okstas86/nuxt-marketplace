import { readBody } from 'h3';

interface CartItem {
  productId: string;
  quantity: number;
}

interface RequestBody {
  productId: string;
}

let cart: CartItem[] = []; 

export default async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    const body: RequestBody = await readBody(req);
    const { productId } = body;

    if (!productId) {
      res.statusCode = 400;
      return { error: 'Product ID is required' };
    }

    const existingProductIndex = cart.findIndex(item => item.productId === productId);

    if (existingProductIndex > -1) {
      if (cart[existingProductIndex].quantity > 1) {
        cart[existingProductIndex].quantity -= 1;
      } else {
        cart = cart.filter(item => item.productId !== productId);
      }
    }

    return { success: true, cart };
  } else {
    res.statusCode = 405;
    return { error: 'Method Not Allowed' };
  }
};
