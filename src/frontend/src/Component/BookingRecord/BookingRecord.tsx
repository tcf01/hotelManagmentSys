import React, { Dispatch } from 'react';
import { IRootState } from '../redux/store';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { getBookingRecordByUserId } from '../redux/hotel/thunk';

export interface BookingRecordProps {
    bookingRecord: Array<any>;
    getBookingRecordByUserId: (id: string) => void;
    match: MatchProps;
}

export interface BookingRecordState {
    userIdFromUrl: string;
}

export interface MatchProps {
    params: {
        userId: string;
    };
}

class BookingRecord extends React.Component<
    BookingRecordProps & RouteComponentProps,
    BookingRecordState
> {
    constructor(props: BookingRecordProps & RouteComponentProps) {
        super(props);
        this.state = {
            userIdFromUrl: this.props.match.params.userId,
        };
    }

    componentDidMount = () => {
        this.props.getBookingRecordByUserId(this.state.userIdFromUrl);
    };

    render = () => {
        return <div>hey, please check the console for result</div>;
    };
}

const mapStateToProps = (state: IRootState) => {
    return {
        bookingRecord: state.hotel.bookingRecordById,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    getBookingRecordByUserId: (id: string) => dispatch(getBookingRecordByUserId(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BookingRecord);
