import React from 'react'
import { useState } from 'react'
import Cardimage1 from "../Images/card1-image.png"
import Cardimage2 from "../Images/card2-image.png"
import Cardimage3 from "../Images/card3-image.jpg"
import Cardimage4 from "../Images/card4-image.jpg"
import Cardimage5 from "../Images/card5-image.png"
import Cardimage6 from "../Images/card6-image.png"
import Cardimage7 from "../Images/card7-image.png"
import Cardimage8 from "../Images/card8-image.png"
export const DashboardDataContext= React.createContext(null)

function DashboardContext({children}) {
    const [data,setData]=useState([{
        id:0,
        title: "Causual Shoes",
        imageUrl: Cardimage1,
        category:"Mens",
        style:"shoes"
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
        imageUrl: Cardimage6,
        category:"Mens",
        style:"TrackPants"
    },{
        id:5,
        title: "Shirts",
        imageUrl: Cardimage5,
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
        title: "Kids Wears",
        imageUrl: Cardimage8,
        category:"kidsWears",
        style:"combos"
    },])
  return <DashboardDataContext.Provider value={{data,setData}}>
  {children}
 </DashboardDataContext.Provider>
}

export default DashboardContext