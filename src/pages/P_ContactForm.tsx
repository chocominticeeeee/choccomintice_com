import "./P_ContactForm.scss";
import PageTitle from "../components/PageTitle";

export default function P_ContactForm() {
    return (
        <div id="P_ContactForm">
            <PageTitle title="Contact" />
            <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                    <label>
                        Don't fill this out if you're human: <input name="bot-field" />
                    </label>
                </p>
                <div className="form-group">
                    <label htmlFor="name">名前:</label>
                    <input type="text" id="name" name="name" required placeholder="お名前を入力してください" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">メールアドレス:</label>
                    <input type="email" id="email" name="email" required placeholder="example@email.com" />
                </div>
                <div className="form-group">
                    <label htmlFor="message">メッセージ:</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        placeholder="お問い合わせ内容を入力してください"
                    ></textarea>
                </div>
                <button type="submit">送信する</button>
            </form>
        </div>
    );
}
