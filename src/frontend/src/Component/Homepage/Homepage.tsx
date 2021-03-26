import React from 'react';
import './homepage.css';
import '../tsFiles/homepage.ts';
import { FloatingCard } from './FloatingCard';

interface IHomepageProps {
    searchText: string;
}

interface IHomePageState {
    contactContent: string;
    contactName: string;
    contactEmail: string;
}

export class Homepage extends React.Component<IHomepageProps, IHomePageState> {
    initialState = {
        contactContent: '',
        contactName: '',
        contactEmail: '',
    };

    constructor(props: IHomepageProps) {
        super(props);
        this.state = this.initialState;
    }

    handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({ [e.target.name]: e.target.value } as Pick<
            IHomePageState,
            keyof IHomePageState
        >);
    };

    handleReset = () => {
        this.setState(this.initialState);
    };

    render = () => {
        return (
            <div className={'homepage'}>
                <div className={'carouselSection'}>
                    <div
                        id="carouselExampleSlidesOnly"
                        className="carousel slide"
                        data-ride="carousel"
                    >
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="animationAndSearch">
                                    <div className="textSection">
                                        <div className="fixedLine">為你準備一個精彩旅程</div>
                                    </div>
                                </div>
                                <img
                                    className="d-block w-100"
                                    src="http://bit.ly/2LyoYVI"
                                    alt="Second slide"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ourMission">
                    <div className={'titleText'}>我們的願景</div>
                    <div className="sectionBoxes">
                        <FloatingCard>
                            <div className="section section1">
                                <div className="imageSection">
                                    <img src="http://bit.ly/2s3P640" alt="" />
                                </div>
                                <div className="textSection">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                                    adipisci architecto autem consequuntur, eos est, facere facilis
                                    maxime minus nam nesciunt perferendis qui quibusdam quis sed
                                    sint voluptatem? Modi, pariatur!
                                </div>
                            </div>
                        </FloatingCard>
                        <FloatingCard>
                            <div className="section section2">
                                <div className="imageSection">
                                    <img src="http://bit.ly/2s3P640" alt="" />
                                </div>
                                <div className="textSection">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                                    adipisci architecto autem consequuntur, eos est, facere facilis
                                    maxime minus nam nesciunt perferendis qui quibusdam quis sed
                                    sint voluptatem? Modi, pariatur!
                                </div>
                            </div>
                        </FloatingCard>
                        <FloatingCard>
                            <div className="section section3">
                                <div className="imageSection">
                                    <img src="http://bit.ly/2DUUzwJ" alt="" />
                                </div>
                                <div className="textSection">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                                    adipisci architecto autem consequuntur, eos est, facere facilis
                                    maxime minus nam nesciunt perferendis qui quibusdam quis sed
                                    sint voluptatem? Modi, pariatur!
                                </div>
                            </div>
                        </FloatingCard>
                    </div>
                </div>
                <hr />
                <div className="contactUs">
                    <h1 className="headerText">我們樂意聆聽</h1>
                    <div className="information">
                        姓名：
                        <input
                            type="text"
                            name={'contactName'}
                            value={this.state.contactName}
                            onChange={this.handleOnChange}
                        />
                        電郵：
                        <input
                            type="text"
                            name={'contactEmail'}
                            value={this.state.contactEmail}
                            onChange={this.handleOnChange}
                        />
                    </div>
                    <textarea
                        rows={4}
                        cols={50}
                        name={'contactContent'}
                        value={this.state.contactContent}
                        onChange={this.handleOnChange}
                        placeholder={'Please feel free to tell us your thoughts'}
                    />
                    <div className="buttons">
                        <input type="submit" className={'submitButton'} />
                        <input type="reset" className={'resetButton'} onClick={this.handleReset} />
                    </div>
                </div>
            </div>
        );
    };
}
