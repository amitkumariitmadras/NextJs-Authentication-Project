import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { dbConnect } from "@/dbConfig/dbConfig";

dbConnect();

export async function GET(request: NextRequest) { 
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password")
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }
        return NextResponse.json({
            message: "User fetched successfully",
            success: true,
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}