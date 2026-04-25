import "./PageTitle.scss";

interface PageTitleProps {
    title: string;
    description?: string;
}

export default function PageTitle({ title, description }: PageTitleProps) {
    return (
        <div className="PageTitle">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}
