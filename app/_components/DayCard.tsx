import Image from "next/image"
import { DeleteButton } from "./DeleteButton"
import { EditButton } from "./EditButton"
import { ObjectId } from "mongodb"

interface DayCardProps {
    menu: {
        name: string,
        ingredients: {
            pt: string,
            en: string,
            fr: string
        },
        price: string
        imageUrl: string
    }
}

export const DayCard: React.FC<DayCardProps> = ({ menu }) => {
    const { name, price, imageUrl, ingredients } = menu
    return (
        <div className="flex flex-col justify-between py-2 border-black 
        border-[2px] w-[27rem] h-[14.4rem] rounded-xl">
            <div className="flex justify-between px-3">
                <p className="max-w-[17rem]">{name}</p>
                <p>{price}€</p>
            </div>
            <div className="flex justify-between px-3">
                <div className="relative h-[10rem] w-[10rem]">
                    <Image
                        fill
                        className="object-cover"
                        src={imageUrl}
                        alt={`${name} image`}
                    />
                </div>
                <p className="max-w-[10rem]">{ingredients.pt}</p>
                <div className="flex flex-col self-end gap-2">
                    <EditButton/>
                    <DeleteButton menuName={name}/>
                </div>
            </div>
        </div>
    )
}