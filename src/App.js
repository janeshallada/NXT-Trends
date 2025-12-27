import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import CartContext from './context/CartContext'
import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachItem => eachItem.id !== id),
    }))
  }

  addCartItem = product => {
    this.setState(prevState => {
      const {cartList} = prevState
      const productExists = cartList.find(
        eachItem => eachItem.id === product.id,
      )

      if (productExists !== undefined) {
        const updatedCartList = cartList.map(eachItem => {
          if (eachItem.id === product.id) {
            return {
              ...eachItem,
              quantity: eachItem.quantity + product.quantity,
            }
          }
          return eachItem
        })
        return {cartList: updatedCartList}
      }
      return {cartList: [...cartList, product]}
    })
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem =>
        eachItem.id === id
          ? {...eachItem, quantity: eachItem.quantity + 1}
          : eachItem,
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => {
      const {cartList} = prevState
      const product = cartList.find(eachItem => eachItem.id === id)

      if (product.quantity === 1) {
        return {
          cartList: cartList.filter(eachItem => eachItem.id !== id),
        }
      }

      return {
        cartList: cartList.map(eachItem =>
          eachItem.id === id
            ? {...eachItem, quantity: eachItem.quantity - 1}
            : eachItem,
        ),
      }
    })
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          {/* Product item details – support both paths used in tests/spec */}
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute
            exact
            path="/product-details/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
