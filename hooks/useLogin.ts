import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/constants/Config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";


export default function useLogin() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [status, setStatus] = useState<string>("unauthenticate");
  const [error, setError] = useState<string | null>(null);

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  const onAuthStateChangedHandler = (user: any) => {
    console.log("onAuthStateChange", user);
    setUser(user);
    if (initializing) {
      setInitializing(false)
    }
  }

  useEffect(() => {
    console.log("inisialiasi hooks login")
    const subscriber = onAuthStateChanged(auth, onAuthStateChangedHandler);
    // const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber;
  }, []);

  const onLogin = () => {
    setStatus("loading")
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(userCredential.user)
        setStatus("authenticated")

        // ...
      })
      .catch((error) => {
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    // setTimeout(() => {
    //   if (form.email == "") {
    //     setError("Email required to fill")
    //   }
    //   else if (form.password == "") {
    //     setError("Password required to fill")
    //   }
    // }, 3000)
  }

  const setEmail = (text: string) => {
    setForm((prev) => {
      return {
        ...prev,
        email: text,
      }
    })
  }

  const setPassword = (text: string) => {
    setForm((prev) => {
      return {
        ...prev,
        password: text,
      }
    })
  }

  const setFormLogin = (type: string, text: string) => {
    if (type == "password") {
      setPassword(text)
    } else if (type == "email") {
      setEmail(text)
    }
  }

  return {
    form,
    status,
    error,
    setFormLogin,
    onLogin
  }
}