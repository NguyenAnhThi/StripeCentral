import React, { Component } from "react";
import "./App.css";
import "bulma/css/bulma.css";
import { Table, Box } from "bloomer";

export default class Charges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCharges: [],
      status: "None"
    };
  }

  componentWillMount(props) {
    this.setState(
      {
        status: "Loading..."
      },
      () => {
        this.props.getCharges("charges").then(json => {
          this.setState({
            listCharges: json.data,
            status: ""
          });
        });
      }
    );
  }

  render() {
    return (
      <div>
        <Box>
          <div className="title">Charges</div>
          <Table isBordered isStriped isNarrow>
            <thead>
              <tr>
                <th>Id</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {this.state.listCharges.map(c => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.amount}</td>
                  <td>{c.currency}</td>
                  <td>{c.description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <p>{this.state.status}</p>
        </Box>
      </div>
    );
  }
}
