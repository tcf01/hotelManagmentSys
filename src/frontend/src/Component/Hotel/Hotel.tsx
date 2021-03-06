import React from 'react';
import './hotel.scss';
import $ from 'jquery';
import moment from 'moment';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { filterHotelFromBackend, getAllHotelsFromBackend } from '../redux/hotel/thunk';
import store, { IRootState, ThunkDispatchCustom } from '../redux/store';
import { HotelForDb } from '../redux/hotel/state';

import 'swiper/swiper.scss';
import Swiper from 'react-id-swiper';
import { Link } from 'react-router-dom';

export interface Criteria {
    name?: string;
    startDate: string;
    endDate: string;
}

export interface MatchProps {
    params: {
        id?: string;
    };
}

export interface IHotelProps {
    //property
    hotelInfo: Array<HotelForDb>;
    searchHotelInfo: Array<HotelForDb>;
    match: MatchProps;

    //method
    getAllHotelsFromBackend: () => void;
    filterHotel: (criteria: Criteria) => void;
}

export interface IHotelState {
    searchBoxText: string;
    startDate: string;
    endDate: string;
}

type TestingTypeOfOmit = Omit<IHotelState, 'filteredHotelResult'>;

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 768 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

class Hotel extends React.Component<IHotelProps, IHotelState> {
    constructor(props: IHotelProps) {
        super(props);
        this.state = {
            searchBoxText: '',
            startDate: moment().format('YYYY-MM-DD'),
            endDate: '',
        };
    }

    // initialise swiper parameters for further usage
    params = {
        autoplay: true,
        loop: true,
    };

    handleSubmit = () => {
        $('.errorMsg').hide();
        const values = Object.values(this.state);
        const { startDate, endDate } = this.state;
        const startDateMomentFormat = moment(startDate);
        const endDateMomentFormat = moment(endDate);
        const day = endDateMomentFormat.diff(startDateMomentFormat, 'day') + 1;

        if (values[1] === '' || values[2] === '') {
            $('.errorMsg')
                .show()
                .html('???????????????');
        } else if (day > 30) {
            $('.errorMsg')
                .show()
                .html('???????????????????????????30???????????????');
        } else {
            $('.errorMsg').hide();
            this.props.filterHotel(this.state);
        }
    };

    changeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [e.target.name]: e.target.value,
        } as Pick<TestingTypeOfOmit, keyof TestingTypeOfOmit>);
    };

    componentDidUpdate = () => {
        if (localStorage.getItem('token') !== undefined) {
            store.dispatch({ type: '@@auth/GET_RESTORED_USER' });
        }
    };

    componentDidMount = async () => {
        await this.props.getAllHotelsFromBackend();
    };

    render = () => {
        return (
            <>
                <div className="upperSection">
                    <Swiper {...this.params}>
                        <div className={'slide-1'}>
                            <img src="http://bit.ly/2tmoeg8" alt="first slide" />
                        </div>
                        <div>
                            <img src="http://bit.ly/2SJ2WUT" alt="" />
                        </div>
                    </Swiper>
                    <div className="blackLayer"></div>
                    <div className="searchSection">
                        <div className="date">
                            <div className="startDate">
                                ???????????????
                                <input
                                    type="date"
                                    name="startDate"
                                    onChange={this.changeSearchText}
                                    value={this.state.startDate}
                                />
                            </div>
                            <div className="endDate">
                                ???????????????
                                <input
                                    type="date"
                                    name="endDate"
                                    onChange={this.changeSearchText}
                                    min={this.state.startDate}
                                />
                            </div>
                        </div>
                        <div className={'location'}>
                            ???????????????
                            <input
                                type="text"
                                name="searchBoxText"
                                value={this.state.searchBoxText}
                                onChange={this.changeSearchText}
                            />
                            <Button onClick={this.handleSubmit}>Submit</Button>
                        </div>

                        <div className="errorMsg">
                            {/*filled by error msg from hotel thunk.ts*/}
                        </div>
                    </div>
                </div>
                {this.props.searchHotelInfo.length === 0 ? (
                    <div className="recommendSectionWrapper">
                        <div className="resultSection">
                            <h2>???????????????</h2>
                            <div className="carouselWrapper">
                                <Carousel
                                    arrows={false}
                                    autoPlay={true}
                                    autoPlaySpeed={2000}
                                    centerMode={false}
                                    className="carouselSection"
                                    draggable
                                    focusOnSelect={true}
                                    infinite
                                    minimumTouchDrag={80}
                                    renderButtonGroupOutside={false}
                                    responsive={responsive}
                                    showDots={true}
                                    sliderClass=""
                                    slidesToSlide={1}
                                >
                                    <div className={'carouselEachItemContainer'}>
                                        <h3>??????????????? - ???????????????????????????</h3>
                                        <img
                                            src="https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                                            className={'carouselPicture'}
                                            alt=""
                                        />
                                    </div>
                                    <div className={'carouselEachItemContainer'}>
                                        <h3>Kim's Massage & Spa - ??????????????????</h3>
                                        <img
                                            src="https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                                            className={'carouselPicture'}
                                            alt=""
                                        />
                                    </div>
                                    <div className={'carouselEachItemContainer'}>
                                        <h3>???????????????????????? - ???????????????????????????</h3>
                                        <img
                                            src="https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                                            className={'carouselPicture'}
                                            alt=""
                                        />
                                    </div>
                                </Carousel>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={'searchSectionWrapper'}>
                        <div className="resultSection">
                            <h3>???????????????</h3>
                            <div className="hotelResults">
                                {this.props.searchHotelInfo.map(
                                    (elem: HotelForDb, index: number) => {
                                        return (
                                            /*<>*/
                                            /*    <HotelCardAnimation*/
                                            /*        className={`hotelWrapper ${elem.id}`}*/
                                            /*        elem={elem}*/
                                            /*    />*/
                                            /*</>*/
                                            <Link
                                                to={`/hotel/${elem.id}?startDate=${this.state.startDate}&endDate=${this.state.endDate}`}
                                                className=""
                                                key={index}
                                            >
                                                <div className={`hotelWrapper ${elem.id}`}>
                                                    <div className="basicInfo c front">
                                                        <div className="hotelPic">
                                                            <img
                                                                src="http://bit.ly/2LQQe20"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="contactInfo">
                                                            <div className={`hotel chiName`}>
                                                                {elem.chiName}
                                                            </div>
                                                            <div className={`hotel engName`}>
                                                                {elem.engName}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    },
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    };
}

const mapStateToProps = (state: IRootState) => ({
    recommendHotelInfo: state.hotel.recommendHotelInfo,
    searchHotelInfo: state.hotel.searchHotelInfo,
});

const mapDispatchToProps = (dispatch: ThunkDispatchCustom) => ({
    getAllHotelsFromBackend: () => dispatch(getAllHotelsFromBackend()),
    filterHotel: (criteria: Criteria) => dispatch(filterHotelFromBackend(criteria)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Hotel);
