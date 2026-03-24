import "./LoadingPage.css";

interface LoadingPageProps {
    isExiting: boolean;
}

export default function LoadingPage({ isExiting }: LoadingPageProps) {
    return (
        <div className={`Loading-root ${isExiting ? "is-exiting" : ""}`}>
            <img
                src="/src/assets/Load.png"
                className="Loading-logo-img"
                alt="logo"
            />
            <p className="Loading-bg-text">
                PLOUF
            </p>
            <div className="Loading-header-container">
                <p className="Loading-hello-text">
                    hello there!
                </p>
            </div>
            <div className="Loading-welcome-container">
                <p className="Loading-welcome-text">
                    WELCOME <br /> TO
                </p>
            </div>

        </div>
    );
}