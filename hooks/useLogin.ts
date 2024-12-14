import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '@/constants/Config';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { router } from 'expo-router';

export default function useLogin() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [status, setStatus] = useState<string>('loading');
  const [error, setError] = useState<string | null>(null);

  const [initializing, setInitializing] = useState(true);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null | {}>({}); // Set default user to {}

  const onAuthStateChangedHandler = (user: any) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
    if (user) {
      setStatus('authenticate');
    } else {
      setStatus('unauthenticated');
    }
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, onAuthStateChangedHandler);
    return subscriber;
  }, []);

  const onLogin = () => {
    setStatus('loading');
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setIsLogin(true);
        setStatus('authenticate');
      })
      .catch((error) => {
        console.log(error);
        setStatus('unauthenticated');
        setError("Check sek to, passwordmu salah wi lho")
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  };

  const setEmail = (text: string) => {
    setForm((prev) => {
      return {
        ...prev,
        email: text,
      };
    });
  };

  const setPassword = (text: string) => {
    setForm((prev) => {
      return {
        ...prev,
        password: text,
      };
    });
  };

  const setFormLogin = (type: string, text: string) => {
    if (type == 'password') {
      setPassword(text);
    } else if (type == 'email') {
      setEmail(text);
    }
  };

  const logOut = () => {
    signOut(auth).then(() => {
      setStatus('unauthenticated');
      router.replace('/');
    });
  };

  return {
    form,
    status,
    error,
    setFormLogin,
    onLogin,
    user,
    isLogin,
    logOut,
  };
}
