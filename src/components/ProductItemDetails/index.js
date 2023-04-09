import {Component} from 'react'

import './index.css'
import Cookies from 'js-cookie'
import Header from '../Header'

import SimilarProductItem from '../SimilarProductItem'

class ProductItemDetails extends Component {
  state = {data: '', Loading: true, count: 1}

  componentDidMount() {
    this.getSelectedProducts()
  }

  getSelectedProducts = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const newData = {
        id: data.id,
        price: data.price,
        description: data.description,
        imageUrl: data.image_url,
        title: data.title,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
        similarProducts: data.similar_products,
      }
      this.setState({data: newData})
    } else {
      this.setState({Loading: false, data: data.error_msg})
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  onDecrement = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  Routing = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderFailureView = () => {
    const {data} = this.state

    return (
      <div className="bg-container2">
        <img
          className="errorImage"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          alt="error view"
        />
        <p>{data}</p>
        <button type="button" onClick={this.Routing} className="button" id="CS">
          Continue Shopping
        </button>
      </div>
    )
  }

  renderSuccessView = () => {
    const {data, count} = this.state

    const {
      imageUrl,
      description,
      rating,
      title,
      brand,
      availability,
      totalReviews,
      price,
      similarProducts,
    } = data
    return (
      <div className="bg-container1">
        <Header />
        <div className="bg-container">
          <div className="img-container">
            <img
              className="productItemDetailsImage"
              src={imageUrl}
              alt={title}
            />
          </div>
          <div className="content-container">
            <h1>{title}</h1>
            <h1>Rs {price}/-</h1>
            <div className="review-container">
              <button className="button" type="button">
                {rating}
                <img
                  className="star-image"
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                />
              </button>
              <p>{totalReviews} Reviews </p>
            </div>
            <p className="description">{description}</p>
            <p className="para">
              Available:<p className="description">{availability}</p>
            </p>
            <p className="para">
              brand :<p className="description">{brand}</p>
            </p>
            <hr className="horizontalLine" />
            <div className="buttons-container">
              <div className="button-width">
                <button onClick={this.onIncrement} type="button">
                  +
                </button>
                <p>{count}</p>
                <button onClick={this.onDecrement} type="button">
                  -
                </button>
              </div>
            </div>
            <button type="button" className="button add">
              Add to Cart
            </button>
          </div>
        </div>
        <ul className="products-list">
          {similarProducts.map(product => (
            <SimilarProductItem productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {Loading} = this.state
    const result = Loading ? this.renderSuccessView() : this.renderFailureView()
    return result
  }
}
export default ProductItemDetails
