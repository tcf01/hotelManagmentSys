import {HotelForDb} from "./state";

export function getAllHotels(hotelInfo: Array<HotelForDb>) {
    return ({
        type: "@@search/GET_ALL_HOTEL_SUCCESS" as "@@search/GET_ALL_HOTEL_SUCCESS",
        hotelInfo
    })
}

export function getHotelById(recentHotel: HotelForDb) {
    return ({
        type: "@@search/GET_RECENT_HOTEL_SUCCESS" as "@@search/GET_RECENT_HOTEL_SUCCESS",
        recentHotel
    })
}

export function searchHotelResult(searchHotelInfo: Array<HotelForDb>) {
    return ({
        type: "@@search/HOTEL_FROM_BACKEND_SUCCESS" as "@@search/HOTEL_FROM_BACKEND_SUCCESS",
        searchHotelInfo
    })
}

export function getBookingRecordById(bookingRecordById: any) {
    return ({
        type: "@@hotel/GET_BOOKING_RECORD_BY_ID" as "@@hotel/GET_BOOKING_RECORD_BY_ID",
        bookingRecordById
    })
}


type HotelActionCreator =
    typeof getAllHotels
    | typeof searchHotelResult
    | typeof getHotelById
    | typeof getBookingRecordById

export type IHotelAction = ReturnType<HotelActionCreator>


