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

export const addMenu = async (menu_id: ObjectId, day: string) => {

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ menu_id, day })
    }

    const res = await fetch('/api/add-menu', options)
    if (res.status !== 200) return false
    return true
}

export const updateMenu = async (name: string, price: string, text: string, day: string, _id: ObjectId) => {

    const options = {
        method: 'POST',
        header: { 'Content-Type': 'application/app' },
        body: JSON.stringify({
            day,
            name,
            price,
            text,
            _id
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
    _id: ObjectId
    file: File | null
}

export interface NewObjType {
    name: string;
    price: string;
    desc: string | undefined;
    _id: ObjectId
}

export const updateAllMenu = async (values: updateMenuInput): Promise<boolean> => {
    const newObj: NewObjType = {
        name: values.nameRef.current!.value,
        price: values.priceRef.current!.value,
        desc: values.descRef.current?.value,
        _id: values._id,
    }

    const options: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newObj)
    }
    const res: Response = await fetch('/api/update-all-menu', options)

    if(res.status === 200 && values.file){
        const formData: FormData = new FormData()
        formData.append('image', values.file)
        formData.append('_id', String(values._id))
        formData.append('name', values.nameRef.current!.value)

        const options: RequestInit = {
            method: 'POST',
            body: formData
        }

        const res = await fetch('/api/upload-image', options)
        
        
    } else {
        return res.status === 200
    }
    return res.status === 200
}

export const updateDrinkName = async (name: string, _id: ObjectId): Promise<boolean> => {
    const options: RequestInit = {
        method: 'POST',
        headers: { 'Contet-Type': 'application/json' },
        body: JSON.stringify({name, _id })
    }

    const res: Response = await fetch('api/update-drink/wines', options)
    if (res.status === 200) {
        const { result }: { result: boolean } = await res.json()
        if (typeof result === 'boolean') return result
    }
    return false
}

export const updateDrinks = async (name: string, price: string, _id: ObjectId) => {
    const options: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name, price, _id })
    }
    console.log(_id)
    const res: Response = await fetch('api/update-drink/drinks', options)
    if (res.status === 200) {
        const { result }: { result: boolean } = await res.json()
        if (typeof result === 'boolean') return result
    }
    return false
}

export interface DeleteImgParams {
        menuName: string
        name: string
        imageUrl: string
}

export interface DeleteImgReturn {
    type: 'E' | 'S'
    message: string
}

export const deleteImage = async(values: DeleteImgParams): Promise<DeleteImgReturn> => {
    const options: RequestInit = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
    }
     
    const res = await fetch('/api/delete-imgurl', options)

    if(res.status === 200){
        return {type: 'S', message: 'Imagem eliminada com sucesso!'}
    }
    return {type: 'E', message:'Erro a eliminar a imagem, tenta novamente mais tarde'}
}