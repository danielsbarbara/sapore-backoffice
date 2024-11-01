import { updateWineName } from "@/app/_server/CRUD";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

interface ReqType {
    oldName: string
    name: string
    _id: ObjectId
}

export async function POST(req: NextRequest){
    const {oldName, name, _id} = await req.json() as ReqType

    try{
       const isUpdated: boolean = await updateWineName(oldName, name, _id)
       if(!isUpdated) throw new Error('Ocorreu um erro a actualizar')
       return Response.json({result: isUpdated})
    } catch(err){
       return Response.json({result: err})
    }
}