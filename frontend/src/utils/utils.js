export const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export const roundNumber = (num) => {
  if (num >= 1000) {
      return String(`${num / 1000} K`);
  }
  
  return num;
}