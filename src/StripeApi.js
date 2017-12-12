import React from "react";
import _ from "lodash";

const request = (route, key, method, postData) => {
  const dataStr =
    method === "GET"
      ? null
      : _.toPairs(postData)
          .map(a => {
            return `${a[0]}=${a[1]}`;
          })
          .join("&");

  return fetch(`https://api.stripe.com/v1/${route}`, {
    method: method,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: dataStr
  }).then(data => data.json());
};

export function withStripe(WrappedComponent, publicKey, secretKey) {
  return class extends React.Component {
    postPublic(route, postData) {
      return request(route, publicKey, "POST", postData);
    }

    postSecret(route, postData) {
      return request(route, secretKey, "POST", postData);
    }

    getCharges(route) {
      return request(route, secretKey, "GET");
    }

    render() {
      return (
        <WrappedComponent
          postPublic={this.postPublic}
          postSecret={this.postSecret}
          getCharges={this.getCharges}
          {...this.props}
        />
      );
    }
  };
}
