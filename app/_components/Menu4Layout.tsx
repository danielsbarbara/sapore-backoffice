import { Logo } from "./Logo"
import { MenuCards } from "./MenuCards"

export const Menu4Layout: React.FC = () => {
    return (
        <div className="row-start-1 md:col-start-1 grid-side-bar-template 
        border-b-2 border-black md:border-b-0 md:border-r-2">
          <Logo />
          <MenuCards />
          {/* <LogoutButton/> */}
        </div>
    )
}
