import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useEffect, useState } from "react";

export default function useLogin() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [status, setStatus] = useState<string>("unauthenticate");
  const [error, setError] = useState<string | null>(null);

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log("onAuthStateChange", user);
    setUser(user);
    if (initializing) {
      setInitializing(false)
    }
  }

  useEffect(() => {
    console.log("inisialiasi hooks login")
    // const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    // return subscriber;
  }, []);

  const onLogin = () => {
    setStatus("loading")
    setTimeout(() => {
      if (form.email == "") {
        setError("Email required to fill")
      }
      else if (form.password == "") {
        setError("Password required to fill")
      }
      setStatus((prev) => {
        return form.email == "admin@mail.com" && form.password == "password" ? "authenticated" : "unauthenticate"
      })
    }, 3000)
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