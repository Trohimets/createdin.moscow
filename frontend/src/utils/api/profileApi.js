import { BASE_URL_DATA } from "../constants";
import { getResponse } from "../utils";

class Profiles {
  constructor() {
    this._base_url = BASE_URL_DATA;
  }

  getProfileDataLandlord(id) {
    return fetch(`${this._base_url}landlord_profile/?search=${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(getResponse);
  }

  postProfileDataLandlord(data) {
    return fetch(`${this._base_url}landlord_profile/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(getResponse);
  }

  updateProfileDataLandlord(data) {
    return fetch(`${this._base_url}landlord_profile/${data.id}/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(getResponse);
  }

  getProfileDataRenter(id) {
    return fetch(`${this._base_url}renter_profile/?search=${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(getResponse);
  }

  updateProfileDataRenter(data) {
    return fetch(`${this._base_url}renter_profile/${data.id}/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(getResponse);
  }
}

export const apiProfiles = new Profiles();
