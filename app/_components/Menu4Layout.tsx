import { Logo } from "./Logo"
import { LogoutButton } from "./LogoutButton"
import { MenuCards } from "./MenuCards"

export const Menu4Layout: React.FC = () => {
    return (
        <div className="w-[17rem] h-screen border-r-2 border-black flex flex-col 
        items-center justify-between p-3">
          <Logo />
          <MenuCards />
          <LogoutButton/>
        </div>
    )
}
