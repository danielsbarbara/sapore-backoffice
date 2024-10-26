import { ObjectId } from "mongodb"
import { dataType } from "../_components/Box"

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