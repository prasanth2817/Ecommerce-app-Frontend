import React, { useContext } from "react";
import CarouselHome from "./Components/CaroselHome";
import Banner from "./Images/branding-banner.png";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { DashboardDataContext } from "./Context/DashboardContext";
import { useNavigate } from "react-router-dom";;

function Home() {
  const { data } = useContext(DashboardDataContext);
  const navigate= useNavigate()
  const handleNavigate=(product)=>{
    const category = product.category;
    const style = product.style;
    // Navigate to the product page with category and style as route parameters
    navigate( `/productpage?category=${category}&style=${style}`)
  }
  return (
    <>
      <CarouselHome />
      <div className="Container banner">
        <img className="d-block w-100" src={Banner} alt="banner" />
      </div>
      <div className="container-fluid category-text text-center">
        <p>Shop By Category</p>
      </div>
      <div className="container">
        <div className="row">
          {data.map((product, i) => {
            return (
              <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <Card className="card-contents " style={{ width: "100%" }}>
                  <Card.Img variant="top" src={product.imageUrl} />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Button variant="primary" onClick={()=>handleNavigate(product)}>Shop Now</Button>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
