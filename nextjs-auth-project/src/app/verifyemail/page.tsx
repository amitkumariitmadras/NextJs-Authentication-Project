"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const res = await axios.post("/api/users/verifyemail", { token });
      console.log("verifyEmail success", res);
      toast.success("verifyEmail success");
      setVerified(true);
    } catch (error: any) {
      console.log("verifyEmail failed", error.message);
      toast.error(error.message);
      setError(true);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken? urlToken : "");
  }, []);

    useEffect(() => {
      console.log("token", token)
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div className="p-2 bg-green-500 text-black">
          <h2>Email verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div className="p-2 bg-red-500 text-black">
          <h2>Error</h2>
        </div>
      )}
    </div>
  );
}
