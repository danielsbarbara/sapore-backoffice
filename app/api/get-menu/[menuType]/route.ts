import { getMenuByType } from "@/app/_server/CRUD";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, {params}: Params) {
    const {menuType} = await params
    try{
        const menus = await getMenuByType(menuType)
        return Response.json({menus})
    } catch(e){
        return Response.json({message: 'Fail'})
    }
}