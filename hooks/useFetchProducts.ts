import { useEffect, useState } from 'react';
import { db } from '@/constants/Config';
import { collection, doc, getDocs } from 'firebase/firestore';
import { Product } from '@/data/dummyProduct';

const productsRef = collection(db, 'products');

const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    console.log('sedang ambil data');

    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(productsRef);
        const productList: Product[] = querySnapshot.docs.map(
          (doc) =>
            ({
              ...(doc.data() as Product),
              id: doc.id,
              count: 0,
            } as Product)
        );
        setProducts(productList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);
  return {
    products,
    setProducts,
  };
};

export default useFetchProducts;
