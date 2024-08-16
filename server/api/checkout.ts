import { readBody } from 'h3';

interface CartItem {
  productId: string;
  quantity: number;
}

interface CheckoutRequest {
  paymentDetails: {
    cardNumber: string;
    expirationDate: string;
    cvv: string;
    cardholderName: string;
  };
  shippingDetails: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  cartItems: CartItem[];
  totalPrice: number;
}

let cart: CartItem[] = []; 

export default async (req: any, res: any) => {
  if (req.method === 'POST') {
    const body: CheckoutRequest = await readBody(req);

    if (!body || !body.cartItems || !body.totalPrice) {
      res.statusCode = 400;
      return { error: 'Invalid request body' };
    }

    return { status: 'success', orderNumber: 'ORD12345' };
  } else {
    res.statusCode = 405;
    return { error: 'Method Not Allowed' };
  }
};
