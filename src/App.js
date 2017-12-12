import React, { Component } from "react";
//import logo from './logo.svg';
import "./App.css";
import { TabList, Tab } from "./Tabs";
import Checkout from "./Checkout.js";
import Charges from "./Charges.js";
import { withStripe } from "./StripeApi.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({});
  }

  render() {
    const WrappedCheckout = withStripe(
      Checkout,
      "pk_test_KzOIhmOU5D8ft3gyiw5iUpDH",
      "sk_test_TlcadQbeGNrVGsQy0TXlVHlx"
    );

    const WrappedCharges = withStripe(
      Charges,
      "pk_test_KzOIhmOU5D8ft3gyiw5iUpDH",
      "sk_test_TlcadQbeGNrVGsQy0TXlVHlx"
    );

    return (
      <div className="App">
        <TabList>
          <Tab name="Checkout">
            <WrappedCheckout />
          </Tab>
          <Tab name="Charges">
            <WrappedCharges />
          </Tab>
          <Tab name="Disputes">
            <h1>Disputes</h1>
          </Tab>
        </TabList>
      </div>
    );
  }
}

export default App;
