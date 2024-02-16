import React from 'react'

function CarouselImage({text,imageUrl}) {
  return (
    <div>
    <img
      className="d-block w-100"
      src={imageUrl}
      alt={`Slide with text: ${text}`}
    />
  </div>
  )
}

export default CarouselImage