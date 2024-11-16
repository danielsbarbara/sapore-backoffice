"use client"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { getIndexOfPathName } from "../_util/getIndexOnPathName"
import Link from "next/link"

const menuCards = [
    { image: '/pasta.jpg', description: 'Menu Semanal', path:'/menu-semanal' },
    { image: '/menu.jpg', description: 'Menu', path: '/menu' },
    { image: '/desserts.jpg', description: 'Sobremesas', path: '/sobremesas' },
    { image: '/wines.jpg', description: 'Vinhos', path: '/vinhos' },
    { image: '/drinks.jpg', description: 'Bebidas', path: '/bebidas' }
]

export const MenuCards: React.FC = () => {
    const pathName = usePathname()
    const pathToNr = getIndexOfPathName(pathName)
   
    return (
        <div className="flex flex-wrap justify-center gap-2 col-start-2 md:gap-5 
        md:row-start-2 md:col-start-1 md:self-start">
            {menuCards.map((item, i: number) =>
            <Link href={`${item.path}`} key={i}>
                <div className={`relative transition-all w-[6rem] h-[5rem] text-center
                duration-500 hover:scale-110 ${pathToNr === i && 'scale-110'} 
                hover:cursor-pointer hover:drop-shadow-md md:w-[10rem] md:h-[10rem]
                lg:w-[14rem]`}
                    key={i}>
                        <Image
                            className="object-cover rounded-lg"
                            src={item.image}
                            fill
                            alt={`${item.description} image`}
                            />
                    <div className="absolute flex flex-col justify-end items-center w-full h-full bg-gradient-to-t 
                        from-black/50 rounded-lg">
                        <p className="text-sm md:text-lg lg:text-2xl text-white font-bold">{item.description}</p>
                    </div>
                </div>
            </Link>
            )}
        </div>
    )
}