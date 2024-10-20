import { ObjectId } from "mongodb"
import { DBname, GetCollection } from "./mongoConnect"

export async function getTipDay() {
    const collection = await GetCollection(DBname, 'tips-of-day')
    const result = await collection.find().toArray()
    return result
}

export async function getMenu(type: string) {
    const collection = await GetCollection(DBname, 'menu')
    const result = await collection.find({ menuType: type }).toArray()
    return result
}

export const getMenuByType = async (menuType: string) => {
    const collection = await GetCollection(DBname, 'menu')
    const result = await collection.find({ menuType }).toArray()
    return result
}

export const deleteMenu = async (menuName: string, day: string) => {
    const collection = await GetCollection(DBname, 'tips-of-day')
    const result = await collection.updateOne({ 'day.pt': day }, { $pull: { menu: { name: menuName } } })
    return result.acknowledged
}
export const insertMenu = async (menu: any, day: string) => {
    const collection = await GetCollection(DBname, 'tips-of-day')
    const result = await collection.updateOne({ 'day.pt': day }, { $push: { menu: menu } })
    return result
}

export const getMenuByIdName = async (menuName: string, menu_id: ObjectId, language: string) => {
    const collection = await GetCollection(DBname, 'menu')
    // const result = await collection.find({
    //       'pt.food': { $elemMatch: { name: menuName } } }).toArray()
    const result = await collection.aggregate([
        { $match: { _id: new ObjectId(menu_id) } },
        {
            $project: {
                menu: {
                    $filter: {
                        input: language,
                        as: 'item',
                        cond: { $eq: ['$$item.name', menuName] }
                    },
                }
            }
        }]).toArray()
    return result
}

export const updateMenuTipsOfDay = async (day: string, name: string, price: string, text: string, originalName: string) => {
    console.log(text)
    const collection = await GetCollection(DBname, 'tips-of-day')
    const result = await collection.updateOne({ 'day.pt': day, 'menu.name': originalName }, 
        { $set: { 'menu.$.name': name, 'menu.$.price': price, 'menu.$.ingredients.pt': text } })
    return result.acknowledged
}

export const updateMenu = async (name: string, price: string, text: string, originalName: string) => {
    const collection = await GetCollection(DBname, 'menu')
    const result = await collection.updateOne({ 'pt.food.name': originalName }, 
        { $set: { 'pt.food.$.name': name, 'pt.food.$.price': price, 'pt.food.$.description': text } })
    return result.acknowledged
}
