import { create } from 'zustand'
import LoginStore from './LoginStore';

const url = 'https://officely.azurewebsites.net';
//const url = 'http://localhost:8080';

const OfficeStore = create((set) => ({
	offices: [],
	setOffices: 
        (offices) => set({ offices }),
  fetchOffices: 
      (pageSize, pageNum) =>
      {
        return fetch(`${url}/offices?pageSize=${pageSize}&pageNum=${pageNum}`, {
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',  
      }})},
  fetchOffice:
      async (officeId) => fetch(`${url}/offices/${officeId}`, {
        method: 'GET',
        headers: {
          'Accept': '*/*', 
          'Content-Type': 'application/json',  
      }}),
  saveOffice:
      async (officeId) => fetch(`${url}/offices/${officeId}/save`, {
        method: 'POST',
        headers: {
          'Accept': '*/*', 
          'Content-Type': 'application/json',  
          'Authorization': `Bearer ${LoginStore.getState().jwttoken}`
      }}),
  removeSavedOffice:
      async (officeId) => fetch(`${url}/offices/${officeId}/save`, {
        method: 'DELETE',
        headers: {
          'Accept': '*/*', 
          'Content-Type': 'application/json',  
          'Authorization': `Bearer ${LoginStore.getState().jwttoken}`
      }})
}))

function objectToQueryString(obj) {
  return Object.keys(obj)
    .filter(key => obj[key] !== null && obj[key] !== "" && (key!='amenities' || obj[key].length > 0))
    .map(key => 
      {
        if(key === 'amenities')
          return `amenities=${obj[key].join(', ')}`
        return `${key}=${obj[key]}`
      })
    .join('&');
}

function formatDateTime(dateTime)
{
    return dateTime.substring(0,19);
}

function querryOffices(pageSize, pageNum, parameters) {

  
  if(parameters.availableFrom)
    parameters = {...parameters, 
      availableFrom : formatDateTime(parameters.availableFrom)}
  if(parameters.availableTo)
    parameters = {...parameters, 
      availableTo : formatDateTime(parameters.availableTo)}

  let querryUrl = `${url}/offices?pageSize=${pageSize}&pageNum=${pageNum}`;
  let querry = objectToQueryString(parameters);
  querryUrl = querryUrl + '&' + querry;
  return fetch(`${querryUrl}`, {
    method: 'GET',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',  
}})}

export { querryOffices };
export default OfficeStore;