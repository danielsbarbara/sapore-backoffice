import { ObjectId } from "mongodb"
import { useEffect, useState } from "react"

export interface MenuType {
    _id: ObjectId
    menuType: string
    pt: {
        name: string
        food: { name: string, price: string, description: string, imageUrl: string }[]
    }
}

export interface FirstFetch {
    menu: MenuType[]
}



export const useMenu = (menuType: string) => {
    const [menuFetch, setMenu] = useState<MenuType | undefined>(undefined)

    useEffect(() => {
        const fetchMenuF = async () => {
            const options = {
                mehtod: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }

            const res = await fetch(`api/menu-type/${menuType}`, options)
            if (res.status === 200) {
                const {menu: [menu]} = await res.json() as FirstFetch
                setMenu(() => menu)
            }
        }
        fetchMenuF()
    }, [menuType])

    return menuFetch
}