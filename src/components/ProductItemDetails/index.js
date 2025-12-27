import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import CartContext from '../../context/CartContext'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    productDetails: null,
    similarProducts: [],
    quantity: 1,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getFormattedProductData = data => ({
    id: data.id,
    imageUrl: data.image_url,
    title: data.title,
    price: data.price,
    description: data.description,
    brand: data.brand,
    totalReviews: data.total_reviews,
    rating: data.rating,
    availability: data.availability,
  })

  getProductDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedProduct = this.getFormattedProductData(data)
      const updatedSimilar = data.similar_products.map(each =>
        this.getFormattedProductData(each),
      )

      this.setState({
        productDetails: updatedProduct,
        similarProducts: updatedSimilar,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 404) {
      this.setState({apiStatus: apiStatusConstants.failure})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={50} width={50} />
    </div>
  )

  onClickContinueShopping = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderFailureView = () => (
    <div className="product-details-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="error view"
        className="error-view-image"
      />
      <h1 className="error-view-heading">Product Not Found</h1>
      <button
        type="button"
        className="continue-shopping-button"
        onClick={this.onClickContinueShopping}
      >
        Continue Shopping
      </button>
    </div>
  )

  onClickMinus = () => {
    this.setState(prevState => {
      if (prevState.quantity > 1) {
        return {quantity: prevState.quantity - 1}
      }
      return {quantity: 1}
    })
  }

  onClickPlus = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  renderSuccessView = () => (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value
        const {productDetails, similarProducts, quantity} = this.state
        const {
          id,
          imageUrl,
          title,
          price,
          description,
          brand,
          totalReviews,
          rating,
          availability,
        } = productDetails

        const onClickAddToCart = () => {
          const product = {
            id,
            imageUrl,
            title,
            price,
            brand,
            quantity,
          }
          addCartItem(product)
        }

        return (
          <div className="product-details-success-view">
            <div className="product-details-main">
              <img
                src={imageUrl}
                alt="product"
                className="product-details-image"
              />
              <div className="product-details-text">
                <h1 className="product-title">{title}</h1>
                <p className="product-price">Rs {price}/-</p>
                <div className="rating-reviews-container">
                  <div className="rating-box">
                    <p className="rating-text">{rating}</p>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                      alt="star"
                      className="star-image"
                    />
                  </div>
                  <p className="reviews-text">{totalReviews} Reviews</p>
                </div>
                <p className="product-description">{description}</p>
                <p className="product-info">
                  <span className="info-label">Available:</span> {availability}
                </p>
                <p className="product-info">
                  <span className="info-label">Brand:</span> {brand}
                </p>
                <hr className="separator" />
                <div className="quantity-container">
                  <button
                    type="button"
                    className="quantity-control-button"
                    onClick={this.onClickMinus}
                    data-testid="minus"
                  >
                    <BsDashSquare />
                  </button>
                  <p className="quantity-value">{quantity}</p>
                  <button
                    type="button"
                    className="quantity-control-button"
                    onClick={this.onClickPlus}
                    data-testid="plus"
                  >
                    <BsPlusSquare />
                  </button>
                </div>
                <button
                  type="button"
                  className="add-to-cart-button"
                  onClick={onClickAddToCart}
                >
                  ADD TO CART
                </button>
              </div>
            </div>

            <h1 className="similar-products-heading">Similar Products</h1>
            <ul className="similar-products-list">
              {similarProducts.map(eachProduct => (
                <SimilarProductItem
                  key={eachProduct.id}
                  productDetails={eachProduct}
                />
              ))}
            </ul>
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  renderProductDetailsContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <>
        <Header />
        <div className="product-details-bg-container">
          {this.renderProductDetailsContent()}
        </div>
      </>
    )
  }
}

export default ProductItemDetails
