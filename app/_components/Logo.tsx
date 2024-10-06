import Image from "next/image"

export const Logo: React.FC = () => {
    return (
        <div className="p-4">
            <div className="relative h-36 w-36">
                <Image
                    className="object-cover"
                    fill
                    src="/Sapore Logo.webp"
                    alt="Sapore Logo">
                </Image>
            </div>
            <p className="pt-2">Sapore - BackOffice</p>
        </div>
    )
}