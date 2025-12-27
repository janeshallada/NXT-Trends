import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import CartItem from '../CartItem'
import CartSummary from '../CartSummary'
import Header from '../Header'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const isCartEmpty = cartList.length === 0

      const onClickRemoveAll = () => {
        removeAllCartItems()
      }

      return (
        <>
          <Header />
          <div className="cart-bg-container">
            <div className="cart-content-container">
              <h1 className="cart-heading">My Cart</h1>
              {isCartEmpty ? (
                <div className="empty-cart-view">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                    alt="cart empty"
                    className="empty-cart-image"
                  />
                  <h1 className="empty-cart-heading">Your Cart Is Empty</h1>
                  <p className="empty-cart-description">
                    Add items to your cart to see them here.
                  </p>
                  <Link to="/products" className="shop-now-link">
                    <button type="button" className="shop-now-button">
                      Shop Now
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="cart-header">
                    <p className="cart-header-item">Item</p>
                    <button
                      type="button"
                      className="remove-all-button"
                      onClick={onClickRemoveAll}
                    >
                      Remove All
                    </button>
                  </div>
                  <ul className="cart-items-list">
                    {cartList.map(eachItem => (
                      <CartItem key={eachItem.id} cartItemDetails={eachItem} />
                    ))}
                  </ul>
                  <CartSummary cartList={cartList} />
                </>
              )}
            </div>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
