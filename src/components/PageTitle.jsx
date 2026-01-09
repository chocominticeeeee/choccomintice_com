import "./PageTitle.scss";

export default function PageTitle({ title, description }) {
    return (
        <div className="PageTitle">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}
