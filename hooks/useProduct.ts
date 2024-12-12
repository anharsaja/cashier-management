import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { Product } from '@/data/dummyProduct';
import { useEffect, useState } from 'react';
import fetchProducts from './useFetchProducts';
import { FormProduct, initialFormProduct } from '@/data/types/form/product';
import { db } from '@/constants/Config';
import { Alert } from 'react-native';

const useProduct = () => {
  const productsRef = collection(db, 'products');
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<string>('loading');
  const [form, setForm] = useState<FormProduct>(initialFormProduct);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await fetchProducts();
        if (data) {
          setProducts(data);
          setStatus('fetched');
          console.log('fetched');
        }
      } catch (error) {
        alert(error);
      }
    };

    if (status != 'fetched') {
      console.log(status);
      fetchProduct();
    }
  }, [status]);

  const handlerForm = (type: string, text: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [type]: type == 'price' ? parseInt(text) : text,
    }));
  };

  const addProduct = async () => {
    try {
      setStatus('loading-add');
      const productRef = await addDoc(productsRef, form);
      console.log('Document written with ID: ', productRef.id);
      setStatus('added');
    } catch (error) {
      alert(error);
    }
  };

  const editProduct = async (id: string) => {
    if (form.name != '' && form.price != 0) {
      console.log('first', form);
      try {
        setStatus('loading');
        const product = doc(db, 'products', id);
        const editRef = await updateDoc(product, form);
        console.log('Berhasil dirubah', editRef);
      } catch (error) {
        alert(error);
      }
    }
  };
  const deleteProduct = (id: string) => {
    Alert.alert('Delete product', 'Cukup dekne seng mbok guwak, ojo aku?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          try {
            setStatus('loading');
            const productRef = await deleteDoc(doc(db, 'products', id));
            console.log('Data product berhasil dihapus', productRef);
            // alert('Berhasil di hapus');
          } catch (error) {
            alert(error);
          }
        },
      },
    ]);
  };

  return {
    products,
    status,
    form,
    handlerForm,
    addProduct,
    setStatus,
    editProduct,
    deleteProduct,
  };
};

export default useProduct;
