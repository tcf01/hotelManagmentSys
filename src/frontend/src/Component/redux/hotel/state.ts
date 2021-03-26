export interface Class {
    id: Number,
    hotelId: Number,
    date: string,
    className: string,
    totalRoom: Number,
    availableRoom: Number,
    activate: Boolean
}

export interface Hotel {
    chiName: string,
    engName: string,
    classes: Array<Class>,
    telephone: string,
    id: Number
}


export interface BookingRecordsForDb {
    id: Number
    userId: number,
    classId: number,
    date: string,
    isActivate: boolean,
}

export interface ClassForDb {
    id: Number,
    hotelId: Number,
    date: string,
    className: string,
    totalRoom: Number,
    availableRoom: Number,
    activate: Boolean
    bookingRecords: Array<BookingRecordsForDb>
}

export interface HotelForDb {
    chiName: string,
    engName: string,
    classes: Array<ClassForDb>,
    telephone: string,
    id: Number
}

export interface IHotelState {
    recommendHotelInfo: Array<HotelForDb>
    searchHotelInfo: Array<HotelForDb>
    recentHotel: HotelForDb
    bookingRecordById: any
}