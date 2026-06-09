import { useState } from "react";
import { Link } from "react-router-dom";
import KeyVisual from "../components/layout/KeyVisual";
import PageHeader from "../components/layout/PageHeader";
import Breadcrumb from "../components/layout/Breadcrumb";
import kentei0 from "../assets/images/kentei_0.jpg";
import kentei1 from "../assets/images/kentei_1.jpg";
import kentei2 from "../assets/images/kentei_2.jpg";
import kentei4 from "../assets/images/kentei_4.jpg";
import "./P_Kentei.scss";

interface Question {
    /** 設問 */
    q: string;
    /** 選択肢 */
    options: string[];
    /** 正解の選択肢インデックス */
    answer: number;
    /** 解説（任意） */
    hint?: string;
}

const QUESTIONS: Question[] = [
    {
        q: "「ちょこみん」の名前の由来になった食べ物は？",
        options: ["チョコミントアイス", "いちごパフェ", "抹茶ラテ", "メロンクリームソーダ"],
        answer: 0,
        hint: "チョコミントアイスが大好きだから、この名前にしたんだよ〜🍫🌿",
    },
    {
        q: "ちょこみんの年齢は？",
        options: ["17歳", "永遠の18歳", "24歳", "27歳"],
        answer: 3,
        hint: "27歳でした！",
    },
    {
        q: "ちょこみんのお仕事の働き方は？",
        options: ["在宅フリーランス", "学生", "会社員", "カフェ店員さん"],
        answer: 2,
        hint: "夜勤の会社員！🌙 ",
    },
    {
        q: "ちょこみんがVRChatを始めたのはいつ？",
        options: ["2025年3月18日", "2024年1月1日", "2023年12月25日", "2025年8月8日"],
        answer: 0,
        hint: "25/03/18～　バイトの後輩君に誘われたのがきっかけだよ",
    },
    {
        q: "ちょこみんがVRChatで好きなことは？",
        options: ["イベント", "なでなでとV睡", "JUST", "ワールド巡り"],
        answer: 1,
        hint: "なでなでとV睡が好き、大人数は苦手なので基本1対1でまったりしてるよ。",
    },
    {
        q: "ちょこみんのパソコンのCPUは？",
        options: ["Core i5-12400", "Ryzen 5 5600X", "Ryzen 7 9800X3D", "Core i9-14900K"],
        answer: 2,
        hint: "Ryzen 7 9800X3D / RTX 4070Ti Super / RAM 64GB の自作PCだよ💻",
    },
    {
        q: "ちょこみんが使っているマウスは？",
        options: ["Pulsar X2", "Logicool G Pro", "Razer Viper", "Zowie EC2"],
        answer: 0,
        hint: "マウスは Pulsar X2、マウスパッドも Pulsar Superglide-XL だよ🖱",
    },
    {
        q: "ちょこみんの液タブはどれ？",
        options: ["Wacom Cintiq", "iPad Pro", "HUION Kamvas", "XPPEN Artist 22 Plus"],
        answer: 3,
        hint: "液タブは XPPEN Artist 22 Plus！これでイラスト描いてるよ🎨",
    },
    {
        q: "ちょこみんが最近よく遊んでるゲームじゃないのはどれ？",
        options: ["DeltaForce", "APEX", "モンハンワールド", "スプラトゥーン"],
        answer: 3,
        hint: "最近は DeltaForce / APEX / モンハンワールド / CS2 をよく遊んでるよ🎮",
    },
    {
        q: "ちょこみんのTwitter(X)アカウントは？",
        options: ["@Chocomint", "@Choccomintice", "@babumiya", "@mint_choco"],
        answer: 1,
        hint: "フォロバ100％だよ✨ 気軽に絡んでね！",
    },
];

type Screen = "start" | "quiz" | "result";

interface Rank {
    /** このランクに必要な最低正解数 */
    min: number;
    emoji: string;
    title: string;
    message: string;
    /** リザルトに表示する画像 */
    image: string;
}

const RANKS: Rank[] = [
    {
        min: QUESTIONS.length,
        emoji: "🏆",
        title: "1級合格",
        message: "全問正解〜！ちょこみん検定1級合格おめでとう！",
        image: kentei4,
    },
    {
        min: Math.ceil(QUESTIONS.length * 0.8),
        emoji: "✨",
        title: "2級合格",
        message: "すごい！ちょこみん検定2級合格です！",
        image: kentei2,
    },
    {
        min: Math.ceil(QUESTIONS.length * 0.5),
        emoji: "🌱",
        title: "3級合格",
        message: "まぁまぁだね！ｗ",
        image: kentei1,
    },
    {
        min: 0,
        emoji: "🐣",
        title: "不合格；；",
        message: "このサイトを舐めまわすように読んでから再挑戦してみてね！",
        image: kentei0,
    },
];

function rankFor(score: number): Rank {
    return RANKS.find((r) => score >= r.min) ?? RANKS[RANKS.length - 1];
}

export default function P_Kentei() {
    const [screen, setScreen] = useState<Screen>("start");
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [score, setScore] = useState(0);

    const total = QUESTIONS.length;
    const question = QUESTIONS[current];
    const isLast = current === total - 1;

    const start = () => {
        setScreen("quiz");
        setCurrent(0);
        setSelected(null);
        setScore(0);
    };

    const choose = (index: number) => {
        if (selected !== null) return;
        setSelected(index);
        if (index === question.answer) setScore((s) => s + 1);
    };

    const next = () => {
        if (isLast) {
            setScreen("result");
            return;
        }
        setCurrent((c) => c + 1);
        setSelected(null);
    };

    const rank = rankFor(score);

    return (
        <>
            <KeyVisual compact />
            <main className="kentei-page">
                <Breadcrumb items={[{ label: "ちょこみん検定" }]} />
                <PageHeader title="ちょこみん検定" emoji="📝" description="ちょこみんのことどれくらい知ってるかな？" />

                {screen === "start" && (
                    <section className="kentei-card kentei-start">
                        <p className="kentei-start__lead">ぜんぶで {total} 問！</p>
                        <p className="kentei-start__sub">
                            ちょこみんに関する豆知識クイズだよ。
                            <br />
                            何問正解できるかな？満点目指してがんばってね♡
                        </p>
                        <button type="button" className="kentei-btn" onClick={start}>
                            はじめる →
                        </button>
                    </section>
                )}

                {screen === "quiz" && (
                    <section className="kentei-card kentei-quiz">
                        <div className="kentei-quiz__progress">
                            <div className="kentei-quiz__progress-bar">
                                <span
                                    className="kentei-quiz__progress-fill"
                                    style={{ width: `${((current + 1) / total) * 100}%` }}
                                />
                            </div>
                            <span className="kentei-quiz__count">
                                {current + 1} / {total}
                            </span>
                        </div>

                        <div className="kentei-quiz__body">
                            <h2 className="kentei-quiz__q">
                                <span className="kentei-quiz__qno">Q{current + 1}.</span>
                                {question.q}
                            </h2>

                            <ul className="kentei-quiz__options">
                                {question.options.map((opt, i) => {
                                    const answered = selected !== null;
                                    const isAnswer = i === question.answer;
                                    const isPicked = i === selected;
                                    const state = !answered
                                        ? ""
                                        : isAnswer
                                          ? " is-correct"
                                          : isPicked
                                            ? " is-wrong"
                                            : " is-dim";
                                    return (
                                        <li key={i}>
                                            <button
                                                type="button"
                                                className={`kentei-option${state}`}
                                                onClick={() => choose(i)}
                                                disabled={answered}
                                            >
                                                <span className="kentei-option__mark">
                                                    {answered && isAnswer
                                                        ? "○"
                                                        : answered && isPicked
                                                          ? "×"
                                                          : String.fromCharCode(65 + i)}
                                                </span>
                                                {opt}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>

                            {selected !== null && (
                                <div className="kentei-quiz__feedback">
                                    <p
                                        className={
                                            "kentei-quiz__judge" +
                                            (selected === question.answer ? " is-correct" : " is-wrong")
                                        }
                                    >
                                        {selected === question.answer ? "せいかい！🎉" : "ざんねん…(´；ω；`)"}
                                    </p>
                                    {question.hint && <p className="kentei-quiz__hint">{question.hint}</p>}
                                    <button type="button" className="kentei-btn" onClick={next}>
                                        {isLast ? "結果をみる →" : "次の問題へ →"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {screen === "result" && (
                    <section className="kentei-card kentei-result">
                        <img className="kentei-result__image" src={rank.image} alt={rank.title} loading="lazy" />

                        <div className="kentei-result__rank">
                            <span className="kentei-result__rank-emoji">{rank.emoji}</span>
                            <span className="kentei-result__rank-title">{rank.title}</span>
                        </div>

                        <p className="kentei-result__score">
                            {score}
                            <span className="kentei-result__score-total"> / {total}</span>
                            <span className="kentei-result__score-label"> 問正解</span>
                        </p>

                        <p className="kentei-result__message">{rank.message}</p>

                        <div className="kentei-result__actions">
                            <button type="button" className="kentei-btn" onClick={start}>
                                もう一回挑戦する 🔁
                            </button>
                            <Link to="/" className="kentei-result__home">
                                トップに戻る
                            </Link>
                        </div>
                    </section>
                )}
            </main>
        </>
    );
}
