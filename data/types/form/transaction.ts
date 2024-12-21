export type ProductPurchase = {
  product_id: string;
  quantity: number;
};

type formTransaction = {
  user_id: string;
  status: string;
  totalAmount: number;
  typePayment: string;
  products: ProductPurchase[];
};

export { formTransaction };
