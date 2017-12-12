import React, { Component } from "react";
import "bulma/css/bulma.css";
import { Field, Control, Input, Button, Box } from "bloomer";

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestCharge: "",
      cardNumber: "",
      amount: "",
      description: ""
    };
    this.createCharge = this.createCharge.bind(this);
  }

  createCharge(event) {
    this.setState(
      {
        latestCharge: "Creating token..."
      },
      () => {
        this.props
          .postPublic("tokens", {
            "card[number]": this.state.cardNumber,
            "card[exp_month]": "02",
            "card[exp_year]": "2018"
          })
          .then(token => {
            this.setState({ latestCharge: "Create charges..." }, () => {
              if (!token.error) {
                this.props
                  .postSecret("charges", {
                    amount: this.state.amount,
                    currency: "usd",
                    description: this.state.description,
                    source: token.id
                  })
                  .then(charge => {
                    if (!charge.error)
                      this.setState({
                        latestCharge: charge.status.toUpperCase()
                      });
                    else {
                      this.setState({ latestCharge: charge.error.message });
                    }
                  });
              } else {
                this.setState({ latestCharge: token.error.message });
              }
            });
          });
      }
    );
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Box>
          <div className="title">Checkout</div>
          <form onSubmit={this.createCharge}>
            <Field>
              <Control>
                <Input
                  type="text"
                  placeholder="Card number"
                  value={this.state.cardNumber}
                  onChange={e => this.setState({ cardNumber: e.target.value })}
                />
              </Control>
            </Field>

            <Field>
              <Control>
                <Input
                  type="number"
                  placeholder="Amount"
                  value={this.state.amount}
                  onChange={e => this.setState({ amount: e.target.value })}
                />
              </Control>
            </Field>

            <Field>
              <Control>
                <Input
                  type="text"
                  placeholder="Description"
                  value={this.state.description}
                  onChange={e => this.setState({ description: e.target.value })}
                />
              </Control>
            </Field>

            <Field>
              <Control>
                <Button isColor="info" type="submit">
                  Pay
                </Button>
              </Control>
            </Field>
          </form>
        </Box>
        <Field>
          <p
            className={`${
              this.state.latestCharge === "SUCCEEDED" ? "succeed" : "error"
            }`}
          >
            {this.state.latestCharge}
          </p>
        </Field>
      </div>
    );
  }
}
