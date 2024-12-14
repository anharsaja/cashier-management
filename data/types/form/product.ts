type FormProduct = {
  name: string;
  price: number;
  count: number;
};

const initialFormProduct: FormProduct = {
  name: '',
  price: 0,
  count: 0,
};

export { FormProduct, initialFormProduct };
