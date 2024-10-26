import { getDrinksByType } from "@/app/_server/CRUD";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, {params}: Params) {
    const {type} = params
    try{
        const res = await getDrinksByType(type)
        if(!res) throw new Error('Não foram encontrados dados')
        return Response.json({result: res})
    } catch(err){
        return Response.json({message: 'Error'})
    }
}