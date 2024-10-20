import Image from "next/image"

export const Loading: React.FC = () => {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center p-9 bg-bGround">
            <Image
                height={100}
                width={100}
                src={'/Sapore Logo.webp'}
                alt="Sapore Logo"
                className="animate-spin">
            </Image>
            <p>A carregar...</p>
        </div>
    )
}