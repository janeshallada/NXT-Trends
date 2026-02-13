import Popup from 'reactjs-popup'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'
import './index.css'
import 'reactjs-popup/dist/index.css'

const Cart = () => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const numberToWord = number => {
    const words = [
      'Zero',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
      'Ten',
    ]
    return words[number] || number.toString()
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList = [], removeAllCartItems} = value

        const isEmpty = cartList.length === 0

        const totalPrice = Array.isArray(cartList)
          ? cartList.reduce((acc, item) => acc + item.price * item.quantity, 0)
          : 0

        const totalItems = Array.isArray(cartList)
          ? cartList.reduce((acc, item) => acc + item.quantity, 0)
          : 0

        return (
          <>
            <Header />
            <div className="cart-container">
              {isEmpty ? (
                <div className="cart-empty-view-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                    alt="cart empty"
                    className="cart-empty-img"
                  />
                  <h1 className="cart-empty-heading">Your Cart Is Empty</h1>
                  <Link to="/products">
                    <button type="button" className="shop-now-btn">
                      Shop Now
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="cart-content-container">
                  <h1 className="cart-heading">My Cart</h1>
                  <button
                    type="button"
                    className="remove-all-btn"
                    onClick={removeAllCartItems}
                  >
                    Remove All
                  </button>

                  <ul className="cart-list">
                    {cartList.map(eachItem => (
                      <CartItem key={eachItem.id} cartItemDetails={eachItem} />
                    ))}
                  </ul>

                  <div className="cart-summary-container">
                    <h1 className="order-total-value">
                      <span className="order-total-label">Order Total: </span>
                      Rs {totalPrice}/-
                    </h1>
                    <p className="total-items">Items in cart</p>

                    <Popup
                      modal
                      trigger={
                        <button type="button" className="checkout-button">
                          Checkout
                        </button>
                      }
                    >
                      {close => (
                        <div className="popup-container">
                          {orderPlaced ? (
                            <div className="success-container">
                              <p className="success-text">
                                Your order has been placed successfully
                              </p>
                              <button
                                type="button"
                                onClick={() => {
                                  setOrderPlaced(false)
                                  setPaymentMethod('')
                                  close()
                                }}
                              >
                                Close
                              </button>
                            </div>
                          ) : (
                            <>
                              <h1>Payment Method</h1>

                              <div className="payment-options">
                                <label>
                                  <input type="radio" disabled />
                                  Card
                                </label>
                                <label>
                                  <input type="radio" disabled />
                                  Net Banking
                                </label>
                                <label>
                                  <input type="radio" disabled />
                                  UPI
                                </label>
                                <label>
                                  <input type="radio" disabled />
                                  Wallet
                                </label>
                                <label>
                                  <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    onChange={e =>
                                      setPaymentMethod(e.target.value)
                                    }
                                  />
                                  Cash on Delivery
                                </label>
                              </div>

                              <div className="summary">
                                <p>Items: {numberToWord(totalItems)}</p>
                                <p>Total: Rs {totalPrice}/-</p>
                              </div>

                              <button
                                type="button"
                                disabled={paymentMethod !== 'cod'}
                                onClick={() => setOrderPlaced(true)}
                              >
                                Confirm Order
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </Popup>
                  </div>
                </div>
              )}
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Cart
