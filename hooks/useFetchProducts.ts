import { useEffect, useState } from 'react';
import { db } from '@/constants/Config';
import { collection, doc, getDocs } from 'firebase/firestore';
import { Product } from '@/data/dummyProduct';
import { useCartContext } from '@/contexts/cartContext';

const productsRef = collection(db, 'products');

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
    return productList;
  } catch (error) {
    console.log(error);
  }
};

export default fetchProducts;
