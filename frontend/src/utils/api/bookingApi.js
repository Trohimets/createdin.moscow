import { BASE_URL_DATA } from "../constants";
import { getResponse } from "../utils";

class Booking {
  constructor() {
    this._base_url = BASE_URL_DATA;
  }

  postBooking(data, token) {
    return fetch(`${this._base_url}bookings/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `token ${token}`
      },
      body: JSON.stringify(data),
    }).then(getResponse);
  }

  getBookings(token) {
    return fetch(`${this._base_url}bookings/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `token ${token}`
      }
    }).then(getResponse);
  }

  putBookingsConfirm(token, data) {
    return fetch(`${this._base_url}bookings/${data.id}/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `token ${token}`
      },
      body: JSON.stringify(data),
    }).then(getResponse);
  }

  putBookingsReject(token, data) {
    return fetch(`${this._base_url}bookings/${data.id}/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `token ${token}`
      },
      body: JSON.stringify(data),
    }).then(getResponse);
  }


}

export const apiBooking = new Booking();
