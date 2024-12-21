import { db } from '@/constants/Config';
import { collection, doc, getDocs } from 'firebase/firestore';
import { Product } from '@/data/types/model/product';

const productsRef = collection(db, 'products');

const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(productsRef);
    const productList: Product[] = querySnapshot.docs.map(
      (doc) =>
        ({
          ...(doc.data() as Product),
          id: doc.id,
        } as Product)
    );
    return productList;
  } catch (error) {
    console.log(error);
  }
};

export default fetchProducts;
