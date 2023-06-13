import { BASE_URL_DATA } from "../constants";
import { getResponse } from "../utils";

class Comments {
  constructor() {
    this._base_url = BASE_URL_DATA;
  }

  getCommentsList() {
    return fetch(`${this._base_url}comments/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(getResponse);
  }

  postComment(data, token) {
    return fetch(`${this._base_url}comments/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `token ${token}`,
      },
      body: JSON.stringify(data),
    }).then(getResponse);
  }
}

export const apiComments = new Comments();
