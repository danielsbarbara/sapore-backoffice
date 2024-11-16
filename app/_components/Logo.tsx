import Image from "next/image"

export const Logo: React.FC = () => {
    return (
        <div className="w-[8rem] md:w-[20rem] col-start-1 md:row-start-1
        self-start flex flex-col justify-center items-center">
            <div className="relative h-[4rem] w-[4rem] md:h-[9rem] md:w-[9rem]">
                <Image
                    className="object-cover"
                    fill
                    src="/Sapore Logo.webp"
                    alt="Sapore Logo">
                </Image>
            </div>
            <p className="text-[1rem] md:text-[1.3rem] text-center font-semibold">Sapore - BackOffice</p>
        </div>
    )
}