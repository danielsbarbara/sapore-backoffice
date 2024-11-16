import { getDrinksByType } from "@/app/_server/CRUD";
import { DrinkType, FromBackEndDrinkType } from "@/app/_util/types";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: Params) {
    const { type } = params
    try {
        const res = await getDrinksByType(type) as DrinkType[]
        if (!res) throw new Error('Não foram encontrados dados')

        let newData: FromBackEndDrinkType[] = [{menuName: '', menu:[]}]
        let count: number = 0
        
        for(let i = 0; i < res.length; i++){
            if(newData[count].menuName === res[i].pt.menuName){
                newData[count].menu.push(res[i])
            } else {
                newData = [...newData, {menuName: res[i].pt.menuName, menu: [res[i]]}]
                count++
            }
        }

        return Response.json({ result: newData.filter(el => el.menuName !== '') })
    } catch (err) {
        return Response.json({ message: 'Error' })
    }
}