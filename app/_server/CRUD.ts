import { ObjectId } from "mongodb"
import { DBname, GetCollection } from "./mongoConnect"
import { DeleteImgParams, NewObjType } from "./actions"
import { TipsOfDayType, TipsTypeFromDB } from "../_util/types"

const getMenuById = async(array: ObjectId[]) => {
    const collection = await GetCollection(DBname, 'menu')
    const result = await collection.find({_id: {$in: array}}).toArray()
    return result
}

export async function getTipDay() {
    const collection = await GetCollection(DBname, 'tips-of-day')
    const result = await collection.find().toArray() as TipsTypeFromDB[]
    return await Promise.all(result.map(async(el) => ({...el, menu: await getMenuById(el.menu)}))) as TipsOfDayType[]
}


export async function getMenu(type: string) {
    const collection = await GetCollection(DBname, 'menu')
    const result = await collection.find({ menuType: type }).toArray()
    return result
}

export const getMenuByType = async (menuType: string) => {
    const collection = await GetCollection(DBname, menuType)
    const result = await collection.find().toArray() as TipsTypeFromDB[]
    return await Promise.all(result.map(async(el) => ({...el, menu: await getMenuById(el.menu)}))) as TipsOfDayType[]
}

export const deleteMenu = async (id: string, day: string) => {
    const collection = await GetCollection(DBname, 'tips-of-day')
    const result = await collection.updateOne({ 'day.pt': day }, { $pull: { menu: new ObjectId(id)  } })
    return result.acknowledged
}
export const insertMenu = async (menu_id: any, day: string) => {
    const collection = await GetCollection(DBname, 'tips-of-day')
    const result = await collection.updateOne({ 'day.pt': day }, { $push: { menu: new ObjectId(menu_id) } })
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
    const collection = await GetCollection(DBname, 'tips-of-day')
    const result = await collection.updateOne({ 'day.pt': day, 'menu.name': originalName }, 
        { $set: { 'menu.$.name': name, 'menu.$.price': price, 'menu.$.ingredients.pt': text } })
    return result.modifiedCount === 1
}

export const updateMenu = async (name: string, price: string, text: string, _id: ObjectId) => {
    const collection = await GetCollection(DBname, 'menu')
    const result = await collection.updateOne({ _id: new ObjectId(_id) }, 
        { $set: { 'pt.name': name, price: price, 'pt.description': text } })
    return result.modifiedCount === 1
}


export const getDrinksByType = async(type: string) => {
    const collection = await GetCollection(DBname, 'menu')
    const result = await collection.find({menuType: type }).toArray()
    return result
}

export const updateAllMenu = async (value: NewObjType): Promise<boolean> =>{
    const collection = await GetCollection(DBname, 'menu')
    const result = await collection.updateOne({ _id: new ObjectId(value._id)}, 
        { $set: { 'pt.name': value.name, price: value.price, 'pt.description': value?.desc } })
    return result.modifiedCount === 1
}

export const updateWineName = async(name: string, _id: ObjectId) => {
    const collection = await GetCollection(DBname, 'menu')
    const result = await collection.updateOne({_id: new ObjectId(_id)}, 
    { $set: {'pt.name': name} })
    return result.modifiedCount === 1
}

export const updateDrink = async(name: string, price: string, _id: ObjectId) => {
    const collection = await GetCollection(DBname, 'menu')
    const result = await collection.updateOne({_id: new ObjectId(_id)}, 
    { $set: {'pt.name': name, price: price} })
    return result.modifiedCount === 1
}

export const updateImageUrl = async(name: string, menuName: string, url: string) => {
    const collection = await GetCollection(DBname, 'menu')
    const result = await collection.updateOne({'pt.name': menuName, 'pt.food.name': name}, 
    { $set: {'pt.food.$.imageUrl': url} })
    return result.modifiedCount === 1
} 

export const deleteImgUrl = async({imageUrl, menuName, name}: DeleteImgParams) =>{
    const collection = await GetCollection(DBname, 'menu')
    const result = await collection.updateOne({'pt.name': menuName, 'pt.food.name': name, 'pt.food.imageUrl': imageUrl}, 
    { $set: {'pt.food.$.imageUrl': ''} })
    return result.modifiedCount === 1
}