import { Product } from '@/data/dummyProduct';
import { useEffect, useState } from 'react';
import fetchProducts from './useFetchProducts';

const useProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<string>('loading');

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await fetchProducts();
      if (data) {
        setProducts(data);
        setStatus('fetched');
      }
    };

    fetchProduct();
  }, []);

  return {
    products,
    status,
  };
};

export default useProduct;
