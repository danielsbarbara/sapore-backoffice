import { deleteMenu } from "@/app/_server/CRUD";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest } from "next/server";


export async function DELETE(_: NextRequest, {params}: Params){
    const {menuName} = params as {menuName: string}
    try{
        const [id, day] = menuName.split('&')
        const isDeleted = await deleteMenu(id, day) as {acknowledged: boolean}
        return Response.json({isDeleted: isDeleted.acknowledged})
    } catch(err: any){
        return Response.json({message: err.message})
    }
}
