export type ProductPurchase = {
  product_id: string;
  quantity: number;
  name: string;
  price: number;
};

type formTransaction = {
  user_id?: string;
  user_name: string;
  status: string;
  totalAmount: number;
  typePayment: string;
  createdAt: string;
  products: ProductPurchase[];
};

export { formTransaction };
