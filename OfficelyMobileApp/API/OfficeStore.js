import { create } from 'zustand'
import LoginStore from './LoginStore';

const url = 'https://officely.azurewebsites.net';
//const url = 'http://localhost:8080';

const OfficeStore = create((set) => ({
	offices: [],
	setOffices: 
        (offices) => set({ offices }),
  fetchOffices: 
      async (pageSize, pageNum) => fetch(`${url}/offices?pageSize=${pageSize}&pageNum=${pageNum}`, {
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',  
            'Authorization': `Bearer ${LoginStore.getState().jwttoken}`
      }}),
  fetchOffice:
      async (officeId) => fetch(`${url}/offices/${officeId}`, {
        method: 'GET',
        headers: {
          'Accept': '*/*', 
          'Content-Type': 'application/json',  
          'Authorization': `Bearer ${LoginStore.getState().jwttoken}`
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