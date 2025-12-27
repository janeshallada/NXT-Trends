import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => {
  const {cartItemDetails} = props
  const {id, title, brand, quantity, price, imageUrl} = cartItemDetails

  return (
    <CartContext.Consumer>
      {value => {
        const {
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeCartItem,
        } = value

        const onClickIncrement = () => {
          incrementCartItemQuantity(id)
        }

        const onClickDecrement = () => {
          decrementCartItemQuantity(id)
        }

        const onClickRemove = () => {
          removeCartItem(id)
        }

        const totalPrice = price * quantity

        return (
          <li className="cart-item">
            <div className="cart-item-main">
              <img src={imageUrl} alt={title} className="cart-item-image" />
              <div className="cart-item-details">
                <p className="cart-item-title">{title}</p>
                <p className="cart-item-brand">by {brand}</p>
                <div className="quantity-controls">
                  <button
                    type="button"
                    className="quantity-button"
                    onClick={onClickDecrement}
                    data-testid="minus"
                  >
                    <BsDashSquare />
                  </button>
                  <p className="quantity-value">{quantity}</p>
                  <button
                    type="button"
                    className="quantity-button"
                    onClick={onClickIncrement}
                    data-testid="plus"
                  >
                    <BsPlusSquare />
                  </button>
                </div>
              </div>
            </div>
            <div className="cart-item-right">
              <p className="cart-item-price">Rs {totalPrice}/-</p>
              <button
                type="button"
                className="remove-button"
                onClick={onClickRemove}
                data-testid="remove"
              >
                <AiFillCloseCircle className="remove-icon" />
              </button>
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItem
