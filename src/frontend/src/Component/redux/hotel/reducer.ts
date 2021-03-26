import {IHotelState} from "./state";
import {IHotelAction} from "./action";


const initialState: any = {
    recommendHotelInfo: [],
    searchHotelInfo: [],
    recentHotel: {},
    bookingRecord: []
};

export function hotelReducer(state: IHotelState = initialState, action: IHotelAction): IHotelState {
    switch (action.type) {
        case "@@search/GET_ALL_HOTEL_SUCCESS":
            return {
                ...state,
                recommendHotelInfo: action.hotelInfo
            };
        case "@@search/HOTEL_FROM_BACKEND_SUCCESS":
            return {
                ...state,
                searchHotelInfo: action.searchHotelInfo
            };
        case "@@search/GET_RECENT_HOTEL_SUCCESS":
            return {
                ...state,
                recentHotel: action.recentHotel
            };
        case "@@hotel/GET_BOOKING_RECORD_BY_ID":
            return {
                ...state,
                bookingRecordById: action.bookingRecordById
            };
        default:
            return state
    }
}