import { ObjectId } from "mongodb"
import { dataType } from "../_components/Box"
import { RefObject } from "react"

export const deleteMenu = async (menuName: string, day: string): Promise<boolean> => {
    const options = {
        method: 'DELETE',
        headers: { 'Contet-Type': 'application/json' }
    }

    const deleteMenu = await fetch(`api/delete/${menuName}&${day}`, options)
    if (deleteMenu.status === 200) return true
    return false
}

export const getMenuByType = async (menuType: string) => {
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }
    const res = await fetch(`/api/menu-type/${menuType}`, options)
    if (res.status === 200) {
        const body = await res.json()
        return body
    }
}

export const addMenu = async (menuName: string, menu_id: ObjectId, day: string) => {

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ menuName, menu_id, day })
    }

    const res = await fetch('/api/add-menu', options)
    if (res.status !== 200) return false
    return true
}

export const updateMenu = async (name: string, price: string, text: string, day: string, originalName: string) => {

    const options = {
        method: 'POST',
        header: { 'Content-Type': 'application/app' },
        body: JSON.stringify({
            day,
            name,
            price,
            text,
            originalName
        })
    }
    const res = await fetch('/api/update-menu', options)
    if (res.status === 200) return true
    return false
}

export const fetchMenuByType = async (menuType: string) => {
    if (!menuType) return

    const options = {
        method: 'GET',
        header: { 'Content-type': 'application/json' }
    }

    const res = await fetch(`/api/get-menu/${menuType}`, options)
    if (res.status === 200) {
        const body = await res.json()
        return await body.menus as dataType[]
    }
}

export const fetchDrinksMenu = async (drinkType: string) => {
    if (!drinkType) return

    const options = {
        method: 'GET',
        header: { 'Content-Type': 'application/json' }
    }

    interface DataType {
        _id: ObjectId
        pt: {
            name: string
            food: { name: string, price: string }[]
        }
    }

    const res = await fetch(`/api/get-drinks/${drinkType}`)
    if (res.status === 200) {
        const body = await res.json()
        return body.result as DataType[]
    }
}

interface updateMenuInput {
    nameRef: RefObject<HTMLInputElement>
    priceRef: RefObject<HTMLInputElement>
    descRef: RefObject<HTMLTextAreaElement>
    menuName: string
    oldName: string
}

export interface NewObjType {
    name: string;
    price: string;
    desc: string | undefined;
    menuName: string;
    oldName: string;
}

export const updateAllMenu = async (values: updateMenuInput): Promise<boolean> => {
    const newObj: NewObjType = {
        name: values.nameRef.current!.value,
        price: values.priceRef.current!.value,
        desc: values.descRef.current?.value,
        menuName: values.menuName,
        oldName: values.oldName
    }

    const options: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newObj)
    }

    const res: Response = await fetch('/api/update-all-menu', options)
    return res.status === 200
}

export const updateDrinkName = async (oldName: string, name: string, _id: ObjectId): Promise<boolean> => {
    const options: RequestInit = {
        method: 'POST',
        headers: { 'Contet-Type': 'application/json' },
        body: JSON.stringify({ oldName, name, _id })
    }

    const res: Response = await fetch('api/update-drink/wines', options)
    if (res.status === 200) {
        const { result }: { result: boolean } = await res.json()
        if (typeof result === 'boolean') return result
    }
    return false
}

export const updateDrinks = async (oldName: string, name: string, price: string, id: ObjectId) => {
    console.log(oldName, name, price, id)
    const options: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldName, name, price, id })
    }

    const res: Response = await fetch('api/update-drink/drinks', options)
    if (res.status === 200) {
        const { result }: { result: boolean } = await res.json()
        if (typeof result === 'boolean') return result
    }
    return false
}