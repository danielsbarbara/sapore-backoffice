import { ObjectId, WithId } from "mongodb"

export interface TipsTypeFromDB {
    _id: ObjectId
    day: {
        pt: string
        en: string
        fr: string
    }
    menu: ObjectId[]
}

export interface TipsOfDayType {
    _id: ObjectId
    day: {
        pt: string
        en: string
        fr: string
    }
    menu: WithId<MenuSchema>[]
}

export interface MenuType {
    _id: ObjectId
    day: {
        pt: string
        en: string
        fr: string
    }
    menu: MenuSchema[]
}

export interface MenuSchema {
    _id: ObjectId
    menuType: string
    pt: { name: string, description: string }
    en: { name: string, description: string }
    fr: { name: string, description: string }
    price: string
    imageUrl: string
}

export interface FromBackEndDrinkType {
    menuName: string
    menu: DrinkType[]
}

export interface DrinkType {
    imageUrl: string
    menuType: string
    price: string
    pt: { menuName: string, name: string, description: string }
    _id: ObjectId
}


