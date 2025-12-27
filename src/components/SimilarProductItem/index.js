import './index.css'

const SimilarProductItem = props => {
  const {productDetails} = props
  const {imageUrl, title, brand, rating, price} = productDetails

  return (
    <li className="similar-product-item">
      <img
        src={imageUrl}
        alt={`similar product ${title}`}
        className="similar-product-image"
      />
      <p className="similar-product-title">{title}</p>
      <p className="similar-product-brand">by {brand}</p>
      <div className="similar-product-bottom-row">
        <p className="similar-product-price">Rs {price}/-</p>
        <div className="similar-rating-box">
          <p className="similar-rating-text">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="similar-star-image"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
