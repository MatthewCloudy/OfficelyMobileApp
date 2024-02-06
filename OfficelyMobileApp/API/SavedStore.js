import { create } from 'zustand'
import LoginStore from './LoginStore';

const url = 'https://officely.azurewebsites.net';

const SavedStore = create((set) => ({
    savedOffices: [],
    setSaved: 
        (saved) => set({ saved }),
    fetchSaved:
        async () => fetch(`${url}/offices/saved`, {
            method: 'GET',
            headers: {
                'Accept': '*/*', 
                'Authorization': `Bearer ${LoginStore.getState().jwttoken}`}}),
    saveOffice:
        async (officeId) => fetch(`${url}/offices/${officeId}/save`, {
            method: 'POST',
            headers: {
                'Accept': '*/*', 
                'Authorization': `Bearer ${LoginStore.getState().jwttoken}`
        }}),
    deleteSaved:
        async (officeId) => fetch(`${url}/offices/${officeId}/save`, {
            method: 'DELETE',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${LoginStore.getState().jwttoken}`},
            body: JSON.stringify({ reservation})
        }),
}))

export default SavedStore;