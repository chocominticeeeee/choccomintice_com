import { AVATAR_URL } from "../CONFIG";
import "./MyTwitterCard.scss";
import { Cake, Link, CalendarDays } from "lucide-react";
import twitterIcon from "../assets/images/MyTwitterCard/twitter.png";
import youtubeIcon from "../assets/images/MyTwitterCard/youtube.png";
import marshmallowIcon from "../assets/images/MyTwitterCard/ましゅまろ.png";
import noteIcon from "../assets/images/MyTwitterCard/note.png";
import pixivIcon from "../assets/images/MyTwitterCard/pixiv.png";
import boothIcon from "../assets/images/MyTwitterCard/booth.png";

export default function MyTwitterCard() {
    return (
        <div id="MyTwitterCard" className="mt-3">
            <div className="top">
                <div className="iconContainer">
                    <a href="https://x.com/Choccomintice" target="_blank" rel="noopener noreferrer">
                        <img className="icon" src={AVATAR_URL} alt="ばぶ宮ちょこみん" />
                    </a>
                </div>
                
                <div>
                    <p className="name">ばぶ宮ちょこみん🍼🌱</p>
                    <p className="twitterId">@Choccomintice</p>
                    <p className="description">超健康VRchatter</p>
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

            <div className="hero-social-btns">
                <a
                    href="https://x.com/Choccomintice_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-btn-secondary"
                >
                    <img src={twitterIcon} alt="" className="btn-icon" />
                    Twitter
                </a>
                <a href="https://www.youtube.com/@choccomintice/featured" target="_blank" rel="noopener noreferrer" className="hero-btn-secondary">
                    <img src={youtubeIcon} alt="" className="btn-icon" />
                    Youtube
                </a>
                <a href="https://marshmallow-qa.com/3hklej66hlyeldi?t=vroIjo" className="hero-btn-secondary">
                    <img src={marshmallowIcon} alt="" className="btn-icon" />
                    ましゅまろ
                </a>
                <a href="https://note.com/choccomintice" className="hero-btn-secondary">
                    <img src={noteIcon} alt="" className="btn-icon" />
                    note
                </a>
                <a href="https://www.pixiv.net/users/93100272" className="hero-btn-secondary">
                    <img src={pixivIcon} alt="" className="btn-icon" />
                    Pixiv
                </a>
                <a href="https://choccomintice.booth.pm/" className="hero-btn-secondary">
                    <img src={boothIcon} alt="" className="btn-icon" />
                    BOOTH
                </a>
            </div>
        </div>
    );
}
