"use client";

import Link from "next/link";
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
const [loading, setLoading] = React.useState(false);
  const onSignup = async () => {
    try {
      setLoading(true);
      axios.post("/api/users/signup", user).then((res) => { 
        console.log("signup success",res);
        toast.success("signup success");
        router.push("/login");
      });
    } catch (error: any) { 
      toast.error(error.message);
      console.log("signUp failed",error);
    } finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else { 
      setButtonDisabled(true);
    }
   }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading?"processing":"SignUp"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="border border-gray-500 p-2 text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">email</label>
      <input
        className="border border-gray-500 p-2 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="border border-gray-500 p-2 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button className="border border-gray-500 p-2" onClick={onSignup}>
        {buttonDisabled? "No Signup":"Signup"}
      </button>
      <Link href="/login">Visit Login Page</Link>
    </div>
  );
}
