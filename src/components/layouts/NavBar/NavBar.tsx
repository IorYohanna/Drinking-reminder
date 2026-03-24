import type { Tab } from "../../../type/types"; 
import type { TabId } from "../../../type/types";
import "./NavBar.css";

interface NavbarProps {
    currentTab: TabId;
    onTabChange: (id: TabId) => void;
}

const TABS: Tab[] = [
    {
        id: "home",
        label: "Home",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
        ),
    },
    {
        id: "history",
        label: "History",
        icon: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M10.8414 5.37464V11.6246L15.9221 12.8746M1.00024 2.24965V7.24964H5.7608M2.03923 5.99964C3.21674 3.99271 5.06598 2.45056 7.27087 1.63679C9.47575 0.823023 11.8994 0.788167 14.1275 1.53818C16.3556 2.28819 18.2498 3.77651 19.4864 5.74872C20.723 7.72094 21.2252 10.0546 20.9071 12.3508C20.589 14.6471 19.4704 16.7633 17.7425 18.3377C16.0145 19.9122 13.7846 20.8472 11.4338 20.9828C9.08298 21.1185 6.75728 20.4464 4.85421 19.0815C2.95115 17.7166 1.58887 15.7435 1.00024 13.4996" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        id: "reminders",
        label: "Remind",
        icon: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M4 18V8C4 4.134 7.134 1 11 1C14.866 1 18 4.134 18 8V18M1 18H21M11 21C11.663 21 12.2989 20.7366 12.7678 20.2678C13.2366 19.7989 13.5 19.163 13.5 18.5V18H8.5V18.5C8.5 19.163 8.76339 19.7989 9.23223 20.2678C9.70107 20.7366 10.337 21 11 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        id: "profile",
        label: "Profile",
        icon: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M11 0C4.925 0 0 4.925 0 11C0 17.075 4.925 22 11 22C17.075 22 22 17.075 22 11C22 4.925 17.075 0 11 0ZM2 11C2 13.09 2.713 15.014 3.908 16.542C4.74744 15.4401 5.83015 14.5471 7.07164 13.9327C8.31312 13.3183 9.6798 12.9991 11.065 13C12.4324 12.9984 13.7821 13.3091 15.0111 13.9084C16.2402 14.5077 17.3162 15.3797 18.157 16.458C19.0234 15.3216 19.6068 13.9952 19.8589 12.5886C20.111 11.182 20.0244 9.73553 19.6065 8.36898C19.1886 7.00243 18.4512 5.75505 17.4555 4.73004C16.4598 3.70503 15.2343 2.93186 13.8804 2.47451C12.5265 2.01716 11.0832 1.88877 9.66986 2.09997C8.25652 2.31117 6.91379 2.85589 5.75277 3.68905C4.59175 4.52222 3.64581 5.61987 2.99323 6.8912C2.34065 8.16252 2.00018 9.57097 2 11ZM11 20C8.93391 20.0033 6.93014 19.2926 5.328 17.988C5.97281 17.0646 6.83119 16.3107 7.83008 15.7905C8.82896 15.2702 9.93876 14.999 11.065 15C12.1772 14.999 13.2735 15.2635 14.263 15.7713C15.2524 16.2792 16.1064 17.0158 16.754 17.92C15.1395 19.267 13.1026 20.0033 11 20Z" fill="currentColor" />
            </svg>
        ),
    },
];

export default function Navbar({ currentTab, onTabChange }: NavbarProps) {
    return (
        <nav className="nav-container no-drag">
            {TABS.map((t) => {
                const isActive = currentTab === t.id;
                return (
                    <button
                        key={t.id}
                        onClick={() => onTabChange(t.id)}
                        className="nav-button"
                    >
                        {isActive && <span className="nav-active-bg"></span>}
                        <span
                            className={`nav-icon ${isActive ? "text-[#2D466E]" : "text-[#F5F0E8] hover:text-white"
                                }`}
                        >
                            {t.icon}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
}