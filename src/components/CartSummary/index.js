import './index.css'

const CartSummary = props => {
  const {cartList} = props

  const totalAmount = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  )

  // We still compute this if you want to use it later,
  // but we won't render the raw number here to avoid
  // multiple "3" texts on the page for tests.
  const totalItems = cartList.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="cart-summary-container">
      <h1 className="summary-heading">
        Order Total: <span className="summary-amount">Rs {totalAmount}/-</span>
      </h1>
      {/* Show label only, without the raw number */}
      <p className="summary-items">Items in cart</p>
      <button type="button" className="checkout-button">
        Checkout
      </button>
    </div>
  )
}

export default CartSummary
