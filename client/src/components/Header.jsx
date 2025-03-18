import { assets } from "../assets/assets";

export default function Header({name}) {
  return (
    <div>
      <img src={assets.header_img} alt="header image" className="w-46 h-46 rounded-full mb-6" />
      <h1>Hey {name || "Developer"} <img src={assets.hand_wave} alt="hand wave icon" className="w-8 aspect-square" /></h1>
      <h2>Welcome  to our app</h2>
    </div>
  )
}
