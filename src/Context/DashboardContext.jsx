import React from 'react'
import { useState } from 'react'
import Cardimage1 from "../Images/Causual-shoes.jpeg"
import Cardimage2 from "../Images/Kurtas.jpeg"
import Cardimage3 from "../Images/SweatShirts.jpeg"
import Cardimage4 from "../Images/T-Shirts.jpeg"
import Cardimage5 from "../Images/Tracks.jpeg"
import Cardimage6 from "../Images/Shirts.jpeg"
import Cardimage7 from "../Images/pants.jpeg"
import Cardimage8 from "../Images/Sarees.jpeg"
export const DashboardDataContext= React.createContext(null)

function DashboardContext({children}) {
    const [data,setData]=useState([{
        id:0,
        title: "Causual Shoes",
        imageUrl: Cardimage1,
        category:"Mens",
        style:"CausualShoes"
    },{
        id:1,
        title: "Kurtas",
        imageUrl: Cardimage2,
        category:"Womens",
        style:"Kurtas"
    },{
        id:2,
        title: "Sweatshirts",
        imageUrl: Cardimage3,
        category:"Mens",
        style:"SweatShirts"
    },{
        id:3,
        title: "T-Shirts",
        imageUrl: Cardimage4,
        category:"Mens",
        style:"T-Shirts"
    },{
        id:4,
        title: "Track Pants",
        imageUrl: Cardimage5,
        category:"Mens",
        style:"TrackPants"
    },{
        id:5,
        title: "Shirts",
        imageUrl: Cardimage6,
        category:"Mens",
        style:"Shirts"
    },{
        id:6,
        title: "Pants",
        imageUrl: Cardimage7,
        category:"Mens",
        style:"Pants"
    },{
        id:7,
        title: "Sarees",
        imageUrl: Cardimage8,
        category:"Womens",
        style:"Sarees"
    },])
  return <DashboardDataContext.Provider value={{data,setData}}>
  {children}
 </DashboardDataContext.Provider>
}

export default DashboardContext