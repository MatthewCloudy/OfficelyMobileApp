import { create } from 'zustand'
import LoginStore from './LoginStore';

const url = 'https://officely.azurewebsites.net';

const ReservationStore = create((set) => ({
    reservations: [],
    setReservations: 
        (reservations) => set({ reservations }),
    fetchReservations:
        (pageSize, pageNum) => 
        {
            let fetchUrl = `${url}/reservations?pageSize=${pageSize}&pageNum=${pageNum}&userId=${LoginStore.getState().user.id}`;
            return fetch(fetchUrl, {
            method: 'GET',
            headers: {
                'Accept': '*/*', 
                'Authorization': `Bearer ${LoginStore.getState().jwttoken}`}})   
        },
    fetchReservation:
        async (reservationId) => fetch(`${url}/reservations/${reservationId}`, {
            method: 'GET',
            headers: {
                'Accept': '*/*', 
                'Authorization': `Bearer ${LoginStore.getState().jwttoken}`
        }}),
    updateReservation:
        async (reservation) => fetch(`${url}/reservations/${reservation.id}`, {
            method: 'PUT',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${LoginStore.getState().jwttoken}`},
            body: JSON.stringify({ reservation})
        }),
    deleteReservation:
        async (reservationId) => fetch(`${url}/reservations/${reservationId}`, {
            method: 'DELETE',
            headers: {
                'Accept': '*/*', 
                'Authorization': `Bearer ${LoginStore.getState().jwttoken}`
        }}),
    createReservation:
        async (officeId, startDate, endDate) => fetch(`${url}/reservations`, {
            method: 'POST',
            headers: {
                'Accept': '*/*', 
                'Authorization': `Bearer ${LoginStore.getState().jwttoken}`},
            body: JSON.stringify([{id:0, userId : LoginStore.getState().user.id, 
                    officeId, startDateTime : formatDateTime(startDate), endDateTime : formatDateTime(endDate)}])
        })
}))

const formatDateTime = (dateTime) =>
{
  return dateTime.substring(0, 19);
}

export default ReservationStore ;