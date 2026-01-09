import React from "react";
import "../styles/_MyTwitterCard.scss";
import twitterIcon from "../assets/images/twitterIcon.jpg";
import { Cake, Link, CalendarDays } from "lucide-react";

export default function MyTwitterCard() {
    return (
        <div id="MyTwitterCard">
            <div className="iconContainer">
                <a href="https://x.com/Choccomintice" target="_blank" rel="noopener noreferrer">
                    <img className="icon" src={twitterIcon} />
                </a>
            </div>
            <div>
                <p className="name">ばぶ宮ちょこみん🍼🌱</p>
                <p className="twitterId">@Choccomintice</p>
                <p className="description">
                    VRChatしたり、お絵描きしたり、not書いたり、プログラミングしたり、おいしいご飯を食べることが大好きな人だよ𓂃
                    𓈒𓏸◌
                </p>
                <div className="underBlock">
                    z
                    <div>
                        <span className="litlink">
                            <Link />
                            <a href="http://lit.link/Choccomintice" target="_blank" rel="noopener noreferrer">
                                lit.link/Choccomintice
                            </a>
                        </span>
                        <span className="birthday">
                            <Cake />
                            誕生日: 1998年6月14日
                        </span>
                    </div>
                    <p className="twitterStarted">
                        <CalendarDays />
                        2015年3月からXを利用しています
                    </p>
                </div>
            </div>
        </div>
    );
}
