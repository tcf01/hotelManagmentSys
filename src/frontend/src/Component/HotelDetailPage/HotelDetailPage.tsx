import React, { ChangeEvent, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Class, HotelForDb } from '../redux/hotel/state';
import { Carousel } from 'react-responsive-carousel';
import store, { IRootState } from '../redux/store';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './hotelDetailPage.css';
import { RouteComponentProps } from 'react-router';
import { getHotelFromBackendById, insertBookingRecord } from '../redux/hotel/thunk';
import { Button } from 'react-bootstrap';
import $ from 'jquery';

const jwtDecode = require('jwt-decode');

export interface BookingInfo {
    startDate: string;
    endDate: string;
    username: string;
    classId: string;
}

export interface MatchProps {
    params: {
        id?: string | number;
    };
}

interface HotelDetailPageProps {
    //property
    searchHotelInfo: Array<HotelForDb>;
    match: MatchProps;
    recentHotel: HotelForDb;

    //method
    searchHotelById: (id: number) => void;
    insertBookingRecord: (bookingInfo: BookingInfo) => void;
}

interface HotelDetailPageState {
    recentHotel: HotelForDb;
    startDate: string;
    endDate: string;
    classId: string;
}

class HotelDetailPage extends React.Component<
    HotelDetailPageProps & RouteComponentProps,
    HotelDetailPageState
> {
    constructor(props: HotelDetailPageProps & RouteComponentProps) {
        super(props);
        this.state = {
            recentHotel: {} as HotelForDb,
            startDate: this.props.location.search.match(/(\d{4}.\d{2}.\d{2})/gi)![0],
            endDate: this.props.location.search.match(/(\d{4}.\d{2}.\d{2})/gi)![1],
            classId: '',
        };
    }

    handleOnchange = (e: ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            [e.target.name]: e.target.value,
        } as Omit<HotelDetailPageState, 'recentHotel' | 'classId'>);
    };

    handleBookingButton = async (bookingInfo: any) => {
        const { startDate, endDate, classId } = this.state;

        if (startDate === '' || endDate === '' || classId === '') {
            $('.hotelInfo .errorMsg').text('Please fill in the option');
            return;
        } else {
            const token = localStorage.getItem('token');
            delete bookingInfo.recentHotel;
            bookingInfo.username = jwtDecode(token!).sub;

            await this.props.insertBookingRecord(bookingInfo);
            console.log('successfully booked');
        }
    };

    componentDidMount = () => {
        this.props.searchHotelById(this.props.match.params.id as number);
        // const date = this.props.location.search.match(/(\d{4}.\d{2}.\d{2})/gi);
        // console.log('ifgjh', date);
        // if (this.state.endDate === '' || this.state.startDate === '') {
        //     this.setState({
        //         startDate: date![0],
        //         endDate: date![1],
        //     });
        // }
    };

    componentDidUpdate(
        prevProps: Readonly<HotelDetailPageProps & RouteComponentProps>,
        prevState: Readonly<HotelDetailPageState>,
        snapshot?: any,
    ): void {
        if (localStorage.getItem('token') !== undefined) {
            store.dispatch({ type: '@@auth/GET_RESTORED_USER' });
        }
    }

    render = () => {
        const { chiName, engName, telephone, classes } = this.props.recentHotel;
        return (
            <div className={'hotelDetailWrapper'}>
                <div className="leftSection">
                    <Carousel autoPlay infiniteLoop swipeable>
                        <div>
                            <img src="http://bit.ly/2ujyC9d" />
                        </div>
                        <div>
                            <img src="http://www.fxhotels.com.tw/taipei/wp-content/uploads/2019/12/%E5%A4%A7%E5%BB%B3_038.jpg" />
                        </div>
                        <div>
                            <img src="http://bit.ly/30Jx44a" />
                        </div>
                        <div>
                            <img src="http://bit.ly/2RDtgxy" />
                        </div>
                    </Carousel>
                </div>
                <div className="rightSection">
                    <div className="hotelInfo">
                        <div className="names">
                            <div className="chiName">{chiName}</div>
                            <div className="engName">{engName}</div>
                        </div>
                        <div className="contactSection">
                            <div className="telephone">電話：{telephone}</div>
                        </div>
                        <div className="errorMsg"></div>
                        <div className="classes">
                            可選級別：{' '}
                            <select onChange={this.handleOnchange} name={'classId'}>
                                <option value={``}></option>
                                {classes &&
                                    classes.map((eachClass: Class, index: number) => (
                                        <option value={`${eachClass.id}`} key={index}>
                                            {eachClass.className}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="bookingButton">
                            <Button onClick={() => this.handleBookingButton(this.state)}>
                                Book now
                            </Button>
                            {/*<Elements>*/}
                            {/*    <CheckoutForm />*/}
                            {/*</Elements>*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state: IRootState) => {
    return {
        recentHotel: state.hotel.recentHotel,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    searchHotelById: (id: number) => dispatch(getHotelFromBackendById(id)),
    insertBookingRecord: (bookingInfo: BookingInfo) => dispatch(insertBookingRecord(bookingInfo)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HotelDetailPage);
