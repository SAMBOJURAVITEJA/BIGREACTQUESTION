const SimilarProductItem = props => {
  console.log('ravi')
  const {productData} = props
  const newData = {
    id: productData.id,
    imageUrl: productData.image_url,
    title: productData.title,
    style: productData.style,
    price: productData.price,
    description: productData.description,
    brand: productData.brand,
    totalReviews: productData.total_reviews,
    rating: productData.rating,
    availability: productData.availability,
  }
  const {imageUrl, price, rating, title} = newData

  return (
    <li className="similarProductItemListItem">
      <div className="similarProductImageContainer">
        <img src={imageUrl} alt={title} />
      </div>
      <p>{title}</p>
      <div className="buttons-container">
        <p>Rs {price}</p>
        <button className="button" type="button">
          {rating}
          <img
            className="star-image"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
          />
        </button>
      </div>
    </li>
  )
}
export default SimilarProductItem
