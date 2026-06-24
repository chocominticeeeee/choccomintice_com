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
import { QUESTIONS, type Question } from "../assets/data/questions";

type Screen = "start" | "quiz" | "result";

interface ShuffledQuestion extends Question {
	correctIndex: number;
}

interface Rank {
    /** このランクに必要な最低正解数 */
    min: number;
    emoji: string;
    title: string;
    message: string;
    /** リザルトに表示する画像 */
    image: string;
}

const QUIZ_COUNT = 10;

const RANKS: Rank[] = [
    {
        min: QUIZ_COUNT,
        emoji: "🏆",
        title: "1級合格",
        message: "全問正解〜！ちょこみん検定1級合格おめでとう！",
        image: kentei4,
    },
    {
        min: Math.ceil(QUIZ_COUNT * 0.8),
        emoji: "✨",
        title: "2級合格",
        message: "すごい！ちょこみん検定2級合格です！",
        image: kentei2,
    },
    {
        min: Math.ceil(QUIZ_COUNT * 0.5),
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
    const [quizQuestions, setQuizQuestions] = useState<ShuffledQuestion[]>([]);

    const total = quizQuestions.length;
    const question = quizQuestions[current];
    const isLast = current === total - 1;

    const start = () => {
        const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5);
        const withShuffledOptions: ShuffledQuestion[] = shuffled.slice(0, QUIZ_COUNT).map((q) => {
            const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
            const correctIndex = shuffledOptions.indexOf(q.options[0]);
            return { ...q, options: shuffledOptions, correctIndex };
        });
        setQuizQuestions(withShuffledOptions);
        setScreen("quiz");
        setCurrent(0);
        setSelected(null);
        setScore(0);
    };

    const choose = (index: number) => {
        if (selected !== null) return;
        setSelected(index);
        if (index === question.correctIndex) setScore((s) => s + 1);
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
                <Breadcrumb items={["kentei"]} />
                <PageHeader title="ちょこみん検定" emoji="📝" description="ちょこみんのことどれくらい知ってるかな？" />

                {screen === "start" && (
                    <section className="kentei-card kentei-start">
                        <p className="kentei-start__lead">ぜんぶで {QUIZ_COUNT} 問！</p>
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
                                    const isAnswer = i === question.correctIndex;
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
                                            (selected === question.correctIndex ? " is-correct" : " is-wrong")
                                        }
                                    >
                                        {selected === question.correctIndex ? "せいかい！🎉" : "ざんねん…(´；ω；`)"}
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
