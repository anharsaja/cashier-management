export type Product = {
  id: string;
  name: string;
  price: number;
  count: number;
};

export const products: Product[] = [
  { id: '1', name: 'Alon alon asal kelepon', price: 8000, count: 0 },
  { id: '2', name: 'Kubisu', price: 8000, count: 0 },
  { id: '3', name: 'Kopi Songar', price: 7000, count: 0 },
  { id: '4', name: 'Mie Goreng Fullset', price: 10000, count: 0 },
];
