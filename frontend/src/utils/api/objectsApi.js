import { BASE_URL_DATA } from "../constants";
import { getResponse } from "../utils";

class Objects {
  constructor() {
    this._base_url = BASE_URL_DATA;
  }

  getObjectsList() {
    return fetch(`${this._base_url}buildings/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(getResponse);
  }

  getAllUsers() {
    return fetch(`${this._base_url}renter_profile/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(getResponse);
  }
  getBookingList() {
    return fetch(`${this._base_url}bookings/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(getResponse);
  }


  // Получение данных конкретного места
  getProperBuilding(id) {
    return fetch(`${this._base_url}buildings/${id}/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(getResponse);
  }

  updateProperBuilding(data) {
    return fetch(`${this._base_url}buildings/${data.id}/`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(getResponse);
  }

}

export const apiObjects = new Objects();
