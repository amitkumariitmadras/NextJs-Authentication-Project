"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { link } from "fs";
export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout success");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log("user details", res.data);
    setData(res.data.data._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <h2>Profile Page</h2>
      <p>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`} className="border-green-700 p-2 bg-green-500">{data}</Link>
        )}
      </p>
      <hr />
      <button className="border border-gray-500 p-2" onClick={logout}>
        Logout
      </button>
      <button
        className="border border-gray-500 p-2 bg-purple-700"
        onClick={getUserDetails}
      >
        Get Details
      </button>
    </div>
  );
}
