"use client";

import Link from "next/link";
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => { 
    try {
      setLoading(true);
      axios.post("/api/users/login", user).then((res) => { 
        console.log("login success",res);
        toast.success("login success");
        router.push("/profile");
      });
    } catch (error: any) {
      console.log("login failed", error.message);
      toast.error(error.message);
    }finally{
      setLoading(false);
    }}
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else { 
      setButtonDisabled(true);
    }
   }, [user])
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading?"processing":"Login"}</h1>
      <hr />
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
      <button className="border border-gray-500 p-2" onClick={onLogin}>
        Login
      </button>
      <Link href="/signup"> Visit Signup Page</Link>
    </div>
  );
}
