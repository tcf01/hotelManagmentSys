import {getHotelById, getAllHotels, IHotelAction, searchHotelResult, getBookingRecordById} from "./action";
import {CallHistoryMethodAction} from "connected-react-router";
import {Dispatch} from "redux";
import {Criteria} from "../../Hotel/Hotel";
import {BookingInfo} from "../../HotelDetailPage/HotelDetailPage";
import moment from 'moment';

const {REACT_APP_API_SERVER} = process.env;

export function getAllHotelsFromBackend() {
    return async (dispatch: Dispatch<IHotelAction | CallHistoryMethodAction>) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/hotels`);
        const realRes = await res.json();

        console.log('fetch from backend', realRes);

        realRes[0] !== undefined ? dispatch(getAllHotels(realRes)) : console.log("something has gone wrong")
    }
}

export function getHotelFromBackendById(id: number) {
    return async (dispatch: Dispatch<IHotelAction | CallHistoryMethodAction>) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/hotel?id=${id}`);
        const realRes = await res.json();

        console.log('fetch from backend', realRes[0]);

        realRes[0] !== undefined ? dispatch(getHotelById(realRes[0])) : console.log("something has gone wrong")
    }
}

export function filterHotelFromBackend(filterData: Criteria) {
    return async (dispatch: Dispatch<IHotelAction>) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/filterHotel`, {
                method: "POST",
                headers: {
                    "Content-type": "Application/JSON",
                },
                body: JSON.stringify(filterData)
            })
        ;
        const realRes = await res.json();

        realRes[0] !== undefined ? dispatch(searchHotelResult(realRes)) : console.log("Sth wrong with filterHotelFromBackend");
        console.log('fetch from backend', realRes);
    }
}

export function getBookingRecordByUserId(id: string) {
    return async (dispatch: Dispatch<IHotelAction>) => {
        const idNumberFormat = parseInt(id);
        const res = await fetch(`${REACT_APP_API_SERVER}/bookingRecord/${idNumberFormat}`);
        const realRes = await res.json();

        console.log("realRes係咩？", realRes);

        realRes[0] !== undefined ? dispatch(getBookingRecordById(realRes)) : console.log("sth wrong with the getBookingRecords")
    }
}

export function insertBookingRecord(info: BookingInfo) {
    return async (dispatch: Dispatch<IHotelAction>) => {
        // (bookingInfo[(Object.keys(bookingInfo))] === "")
        // (Object.keys(bookingInfo)).map((elem: Pick<BookingInfo, keyof BookingInfo>) => bookingInfo[elem] === "")
        const totalDayForBooking = calculateDateBetween(info.startDate, info.endDate);
        // try {
        totalDayForBooking.map(async (elem) => {
            let bookingInfo: any = {};
            bookingInfo.startDate = elem;
            bookingInfo.endDate = info.endDate;
            bookingInfo.userId = 28;
            bookingInfo.classId = parseInt(info.classId);
            bookingInfo.isActivate = true;

            const res = await fetch(`${REACT_APP_API_SERVER}/insertBookingRecord`, {
                method: "POST",
                headers: {
                    "Content-type": "Application/JSON",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(bookingInfo)
            });
            const realRes = await res.json();
        })
    }
}

function calculateDateBetween(startDate: string, endDate: string) {
    let startDateMomentFormat: any = moment(startDate, "YYYY-MM-DD");
    const endDateMomentFormat = moment(endDate, "YYYY-MM-DD");
    const day = endDateMomentFormat.diff(startDateMomentFormat, 'days') + 1;
    let dateInTotal: Array<any> = [];

    for (let i = 0; i < day; i++) {
        dateInTotal.push(startDate);
        startDate = moment(startDate, "YYYY-MM-DD").add(1, 'd').format("YYYY-MM-DD");
    }
    return dateInTotal
};
