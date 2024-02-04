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
      }}),
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

export default OfficeStore;