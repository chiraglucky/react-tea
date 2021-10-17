import React, { useState } from "react";
import axios from "axios";
import SearchIcon from "../images/search-icon.svg";
import LogoIcon from "../images/place.png";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { Link } from "react-router-dom";
import Star from "../images/star.png";
import Star1 from "../images/star1.png";
import { useLocation } from "react-router-dom";
import PaymentDataService from "../api/PaymentDataService";
import swal from "sweetalert";

export const ItemContainer = (props) => {
  const { item } = props;
  const [show, setShow] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((c) => (c < 12 ? c + 1 : c));
  };

  const decrement = () => {
    setQuantity((c) => (c > 1 ? c - 1 : (c = 1)));
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = (amount) => {
    console.log(amount);
    loadScript("https://checkout.razorpay.com/v1/checkout.js").then((res) => {
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
    });

    PaymentDataService.createOrder(amount).then((response) => {
      if (response.data.status === "created") {
        let options = {
          key: "rzp_test_AdZ3n8xBWF6JmT",
          amount: response.data.amount,
          currency: response.data.currency,
          name: "Tea House",
          description: "payment for " + item.name,
          image: LogoIcon,
          order_id: response.data.id,
          handler: async function (resp) {
            const data = {
              orderId:response.data.id,
              rzrPaymentId: resp.razorpay_payment_id,
              rzrSignature: resp.razorpay_signature,
            };

            setShowOrder(!showOrder);

            PaymentDataService.storeInfoServer(data).then(
              (r) => {
                console.log(r);
                swal(
                  "Payment Successfull !!!",
                  "We will contact you shortly",
                  "success"
                ).then(() =>
                  swal("For any query", "chiragdale0@gmail.com", "success")
                );
              },
              (e) => {
                console.log(e);
                swal("Payment Successfull but we did not get on server!!,we will contact you shortly", "error");
              }
            );
          },
          prefill: {
            name: "Chirag Dale",
            email: "chiragdale0@gmail.com",
            contact: "9954876985",
          },
          notes: {
            address: "VIT pune",
          },
          theme: {
            color: "#61dafb",
          },
        };
        const paymentObject = new window.Razorpay(options);

        paymentObject.on("payment.failed", function (response) {
          swal("Paymen Failed Try Again!!", "error");
        });

        paymentObject.open();
      }
    });
  };

  return (
    <>
      <Dialog open={show} maxWidth="sm">
        <DialogContent style={{ backgroundColor: "#9D7B61", height: "400px" }}>
          <div className="card-container">
            <ul className="card-ul">
              <li className="card" tabIndex="0">
                <h2>Boiling Temperature</h2>
                <p>{item.boilingTemperature}</p>
              </li>
              <li className="card" tabIndex="0">
                <h2>Brew Time</h2>
                <p>{item.brewTime}</p>
              </li>
              <li className="card" tabIndex="0">
                <h2>Origin</h2>
                {item.origins.map((i) => {
                  return item.origins.length === 1 ? (
                    i.name
                  ) : (
                    <p key={i.id}>{i.name}</p>
                  );
                })}
              </li>
              <li className="card" tabIndex="0">
                <h2>preparation</h2>
                <p>{item.preparation}</p>
              </li>
              <li className="card" tabIndex="0">
                <h2>Benefits</h2>
                {item.keywords.map((i) => (
                  <p key={i.id}>{i.name}</p>
                ))}
              </li>

              <li className="card" tabIndex="0">
                <h2>Description</h2>
                <p>{item.description}</p>
              </li>
            </ul>
          </div>
        </DialogContent>

        <DialogActions style={{ backgroundColor: "#9D7B61" }}>
          <span
            className="search-ingredients"
            onClick={() => window.open(item.moreInfo)}
          >
            More Info
          </span>
          <span className="search-close" onClick={() => setShow(!show)}>
            Close
          </span>
        </DialogActions>
      </Dialog>

      {/* ///// ORDER ////// */}

      <Dialog open={showOrder} maxWidth="md">
        <DialogContent>
          <div id="container">
            <div className="product-details">
              <h1>{item.name}</h1>
              <br />

              <span className="hint-star star">
                <img
                  src={Star}
                  alt="star"
                  style={{ width: "20px", height: "20px" }}
                />
                <img
                  src={Star}
                  alt="star"
                  style={{ width: "20px", height: "20px" }}
                />
                <img
                  src={Star}
                  alt="star"
                  style={{ width: "20px", height: "20px" }}
                />
                <img
                  src={Star}
                  alt="star"
                  style={{ width: "20px", height: "20px" }}
                />
                <img
                  src={Star1}
                  alt="blank star"
                  style={{ width: "20px", height: "20px" }}
                />
              </span>

              <br />

              <h4>quantity :</h4>
              <div className="quantity buttons_added">
                <button value="-" className="minus" onClick={decrement}>
                  -
                </button>
                <input
                  type="number"
                  name="quantity"
                  value={quantity}
                  className="input-text qty text"
                  readOnly
                />
                <button value="+" className="plus" onClick={increment}>
                  +
                </button>
              </div>

              <br />
              <br />
              <div className="control">
                <button
                  className="btn"
                  onClick={() => handlePayment(250 * quantity)}
                >
                  <span className="price">Rs.{250 * quantity}</span>
                  <span className="buy">Sip now</span>
                </button>
              </div>
            </div>

            <div className="product-image">
              <img src={item.imageURL} alt="product-img" />

              <div className="info">
                <h2>Price</h2>
                <ul>
                  <li>
                    <strong>Original Price : </strong>350/Kg
                  </li>
                  <br />
                  <li>
                    <strong>Discount : </strong>Rs. 100
                  </li>
                  <br />
                  <li>
                    <strong>Price: </strong>
                    <span
                      style={{
                        textDecoration: "3px solid line-through #000000",
                      }}
                    >
                      350/kg
                    </span>{" "}
                    250/kg
                  </li>
                  <br />
                  <li>
                    <strong>Brew Time : </strong>
                    {item.brewTime}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>

        <DialogActions>
          <span
            className="search-close"
            onClick={() => {
              setShowOrder(!showOrder);
              setQuantity(1);
            }}
          >
            Close
          </span>
        </DialogActions>
      </Dialog>

      <div className="search-main-container">
        <img className="search-cover-image" src={item.imageURL} alt="tea pic" />
        <span className="search-food-name">{item.name}</span>
        <span
          className="search-ingredients"
          onClick={() => {
            setShow(!show);
          }}
        >
          About
        </span>
        <span
          className="search-others"
          onClick={() => {
            setShowOrder(!showOrder);
          }}
        >
          SIP NOW!
        </span>
      </div>
    </>
  );
};

const Search = () => {
  const [timeoutId, updateTimeoutId] = useState();
  const [searchQuery, updateSearchQuery] = useState("");
  const [itemList, updateItemList] = useState([]);

  const location = useLocation();

  const fetchTea = async (searchString) => {
    const response = await axios.get(
      `/teas/search/${searchString}`
    );
    updateItemList(response.data);
    // console.log(response.data);
  };

  const handleChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchTea(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <div className="search-appname">
          <Link to="/">
            <img className="search-appicon" src={LogoIcon} alt="burger icon" />
          </Link>
          <Link className="search-link" to="/">
            TEA HOUSE
          </Link>
        </div>
        <div className="search-field">
          <img className="search-icon" src={SearchIcon} alt="search icon" />
          <input
            className="search-input"
            value={searchQuery}
            placeholder="Search tea by name,place,benefit,collection etc."
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="search-list-container">
        {itemList.length ? (
          itemList.map((item, index) => (
            <ItemContainer key={index} item={item} />
          ))
        ) : location.state.flag ? (
          location.state.data.map((item,index)=><ItemContainer item={item} key={index} />)
        ) : (
          <img className="search-placeholder" src={LogoIcon} alt="tea pic" />
        )}
      </div>
    </div>
  );
};

export default Search;
