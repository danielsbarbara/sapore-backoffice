import { DeleteImgParams } from "@/app/_server/actions";
import { deleteImgUrl } from "@/app/_server/CRUD";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest){
    try{
        const values = await req.json() as DeleteImgParams
        const isDeleted = await deleteImgUrl(values)
        if(!isDeleted) return Response.json({message: 'Não foi possivel eliminar imagem'}, {status: 400})
        return Response.json({message: 'Eliminado com sucesso'}, {status: 200})
    }catch(err){
        return Response.json({message: 'Ocorreu um erro'}, {status: 500})
    }   
}