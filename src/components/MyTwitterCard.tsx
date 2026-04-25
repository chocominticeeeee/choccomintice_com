import "./MyTwitterCard.scss";
import { Cake, Link, CalendarDays } from "lucide-react";

export default function MyTwitterCard() {
    return (
        <div id="MyTwitterCard">
            <div className="iconContainer">
                <a href="https://x.com/Choccomintice" target="_blank" rel="noopener noreferrer">
                    <img className="icon" src="https://pbs.twimg.com/profile_images/2043548465326940160/XQ7zRbjc_400x400.jpg" />
                </a>
            </div>
            <div>
                <p className="name">ばぶ宮ちょこみん🍼🌱</p>
                <p className="twitterId">@Choccomintice</p>
                <p className="description">
                    超健康VRchatter
                </p>
                <div className="underBlock">
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
