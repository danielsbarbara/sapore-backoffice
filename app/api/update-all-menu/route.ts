import { NewObjType } from "@/app/_server/actions";
import { updateAllMenu } from "@/app/_server/CRUD";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
    const updtObj = await req.json() as NewObjType

    try{
        const isUpdated: boolean = await updateAllMenu(updtObj) 
        if(!isUpdated) throw new Error('Ocorreu um erro a actualizaro menu')
        return Response.json({result: isUpdated})
    } catch {
        return Response.json({result: false})
    }
}