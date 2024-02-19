import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from "../Components/CarouselImage"
import carouselImage1 from "../Images/carosel-image1.png"
import carouselImage2 from "../Images/carosel-image2.png"
import carouselImage3 from "../Images/carosel-image3.png"
import { Link } from 'react-router-dom';

function CarouselHome() {
    const carouselInterval = 3000;
  return (
    <Carousel className='Container carosel' interval={carouselInterval}>
      <Carousel.Item>
        <CarouselImage  text="First slide" imageUrl={carouselImage1} />
        <Carousel.Caption>
          <Link to="/productpage?category=Mens&style=Pants">Click Here</Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage text="Second slide" imageUrl={carouselImage2} />
        <Carousel.Caption>
        <Link to="/productpage?category=Mens&style=Shirts">Click Here</Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage text="Third slide" imageUrl={carouselImage3} />
        <Carousel.Caption>
        <Link to="/productpage?category=Mens&style=CausualShoes">Click Here</Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselHome;