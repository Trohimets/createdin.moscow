import { BASE_URL_DATA } from "../constants";
import { getResponse } from "../../utils/utils";

class Api {
  constructor() {
    this._base_url = BASE_URL_DATA;
  }

  createBuilding(data) {
    console.log(data);
    return fetch(`${this._base_url}buildings/`, {
      method: "POST",
      body: data,
    }).then(getResponse);
  }
}

export const apiData = new Api();
