import { ObjectId } from "mongodb"
import { DBname, GetCollection } from "./mongoConnect"
import { NewObjType } from "./actions"

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
    return result.modifiedCount === 1
}

export const updateMenu = async (name: string, price: string, text: string, originalName: string) => {
    const collection = await GetCollection(DBname, 'menu')
    const result = await collection.updateOne({ 'pt.food.name': originalName }, 
        { $set: { 'pt.food.$.name': name, 'pt.food.$.price': price, 'pt.food.$.description': text } })
    return result.modifiedCount === 1
}


export const getDrinksByType = async(type: string) => {
    const collection = await GetCollection(DBname, 'menu')
    const result = await collection.find({menuType: type }).toArray()
    return result
}

export const updateAllMenu = async (value: NewObjType): Promise<boolean> =>{
    const collection = await GetCollection(DBname, 'menu')
    const result = await collection.updateOne({ 'pt.name': value.menuName, 'pt.food.name': value.oldName }, 
        { $set: { 'pt.food.$.name': value.name, 'pt.food.$.price': value.price, 'pt.food.$.description': value?.desc } })
    return result.modifiedCount === 1
}

export const updateWineName = async(oldName: string, name: string, _id: ObjectId) => {
    const collection = await GetCollection(DBname, 'menu')
    const result = await collection.updateOne({_id: new ObjectId(_id), 'pt.food.name': oldName}, 
    { $set: {'pt.food.$.name': name} })
    return result.modifiedCount === 1
}

export const updateDrink = async(oldName: string, name: string, price: string, id: ObjectId) => {
    const collection = await GetCollection(DBname, 'menu')
    const result = await collection.updateOne({_id: new ObjectId(id), 'pt.food.name': oldName}, 
    { $set: {'pt.food.$.name': name, 'pt.food.$.price': price} })
    return result.modifiedCount === 1
}
