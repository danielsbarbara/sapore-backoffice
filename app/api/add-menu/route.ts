import { getMenuByIdName, insertMenu } from "@/app/_server/CRUD";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

interface FilteredMenu {
    name: string
    price: string
    description: string
    imageUrl?: string
}


const treatmentData = (array: FilteredMenu[]) => {
    return {
        name: array[0].name,
        ingredients: { pt: array[0].description, en: array[1].description, fr: array[2].description },
        price: array[0].price,
        imageUrl: array[0].imageUrl
    }
}

export async function POST(req: NextRequest) {
    const { menu_id, day } = await req.json() as { menu_id: ObjectId, day: string }
    const query: string[] = ['$pt.food', '$en.food', '$fr.food']

    try {
        // const menuToAdd = await Promise.all(query.map((el) => getMenuByIdName(menu_id, el)))

        // const filteredMenu: FilteredMenu[] = menuToAdd.filter(([el]) =>
        //     delete el._id).flat().reduce((acc, curr) =>
        //         acc = [...acc, curr.menu], []).flat()

        // const data = treatmentData(filteredMenu)

        const isUpdated = await insertMenu(menu_id, day)

        return Response.json({ message: isUpdated.acknowledged })
    } catch (err) {

        return Response.json({ message: false })
    }
}
