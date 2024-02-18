import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from "../Components/CarouselImage"
import carouselImage1 from "../Images/carosel-image1.png"
import carouselImage2 from "../Images/carosel-image2.png"
import carouselImage3 from "../Images/carosel-image3.png"

function CarouselHome() {
    const carouselInterval = 3000;
  return (
    <Carousel className='Container carosel' interval={carouselInterval}>
      <Carousel.Item>
        <CarouselImage  text="First slide" imageUrl={carouselImage1} />
        <Carousel.Caption>
          <a href="/productpage?category=Mens&style=Pants">Click Here</a>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage text="Second slide" imageUrl={carouselImage2} />
        <Carousel.Caption>
        <a href="/productpage?category=Mens&style=Shirts">Click Here</a>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage text="Third slide" imageUrl={carouselImage3} />
        <Carousel.Caption>
        <a href="/productpage?category=Mens&style=CausualShoes">Click Here</a>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselHome;