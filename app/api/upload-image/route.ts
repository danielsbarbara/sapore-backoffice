import { NextRequest } from "next/server";
import path from "path";
import fs from 'fs'
import { updateImageUrl } from "@/app/_server/CRUD";

export async function POST(req: NextRequest) {
    try {
        const formData: FormData = await req.formData()
        const file = formData.get('image') as File

        //Verificar se realmente foi enviado uma imagem
        if (!file || !file.type.startsWith('image/')) return Response.json({ message: 'Nenhuma imagem enviada' }, { status: 200 })

        //Verificar o tamanho da imagem, limitado para 5mb
        const maxSize = 5 * 1024 * 1024
        if (file.size > maxSize) Response.json({ message: 'Imagem, demasiado grand' }, { status: 401 })

        //Verificar extensões da imagem
        const extensions = ['jpg', 'jpeg', 'png']
        const fileExtension = path.extname(file.name).toLowerCase().slice(1)
        if (!extensions.includes(fileExtension)) return Response.json({ message: 'Extensão de imagem não suportada' }, { status: 401 })
        
        //Definir o caminho para fazer o upload.
        const uploadDir = path.join(process.cwd(), 'public/teste')
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true })
        }
        // Criar o caminho para o novo arquivo
        const filePath = path.join(uploadDir, file.name)

        // Lê o conteúdo do arquivo usando ArrayBuffer
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        //Escreve no arquivo
        fs.writeFileSync(filePath, buffer)
        
        console.log(`Imagem salva com sucesso em: ${filePath}`);
        const name = formData.get('name') as string
        const id = formData.get('_id') as string
        const databaseImgUrl = `/teste/${file.name}`

        const updateUrlOnDB = await updateImageUrl(name, id, databaseImgUrl)


        return Response.json({ message: 'Image uploaded' }, { status: 200 })
    } catch (err) {
        return Response.json({ message: 'ocorreu um erro' }, { status: 500 })
    }
}