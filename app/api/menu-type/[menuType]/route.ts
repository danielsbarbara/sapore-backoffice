import { getMenuByType } from "@/app/_server/CRUD";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, {params}: Params){
    const {menuType} = params

    try{
        const menu = await getMenuByType(menuType)
        return Response.json({menu})
    } catch(err: any){
        return Response.json({message: err.message})
    }
}