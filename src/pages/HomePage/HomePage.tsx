import { useState, useMemo } from "react";
import type { DrinkLog } from "../../type/types";
import { KEYS, QUICK_AMOUNTS } from "../../utils/constants";
import { save, computeStreak } from "../../utils/utils";
import { CircleProgress } from "../../components/layouts/CircleProgress";
import "./HomePage.css";
import { Card } from "../../components/ui/Card";
import { TI } from "../../components/ui/TextInput";
import { Btn } from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import { SummaryCards } from "../../components/pages/Home/SummyCards";
import { TodayFeed } from "../../components/pages/Home/TodayFeed";
import { GoalSelector } from "../../components/pages/Home/GoalSelector";

interface Props {
    logs: DrinkLog[];
    setLogs: React.Dispatch<React.SetStateAction<DrinkLog[]>>;
    goal: number;
    setGoal: React.Dispatch<React.SetStateAction<number>>;
}

export default function HomePage({ logs, setLogs, goal, setGoal }: Props) {
    const [selAmt, setSelAmt] = useState<number>(250);
    const [selType, setSelType] = useState<string>("water");
    const [customMode, setCustomMode] = useState<boolean>(false);
    const [customAmt, setCustomAmt] = useState<string>("");
    const [goalModal, setGoalModal] = useState<boolean>(false);
    const [goalInput, setGoalInput] = useState<number>(goal);
    const [pop, setPop] = useState<boolean>(false);

    const stats = useMemo(() => {
        const today = new Date().toDateString();
        const todayLogs = logs.filter(l => new Date(l.ts).toDateString() === today);
        const totalMl = todayLogs.reduce((s, l) => s + l.ml, 0);
        const totalL = +(totalMl / 1000).toFixed(2);
        const pct = Math.min(100, Math.round((totalMl / (goal * 1000)) * 100));
        const streak = computeStreak(logs, goal);

        return { todayLogs, totalL, pct, streak };
    }, [logs, goal]);

    const handleUpdateLogs = (next: DrinkLog[]) => {
        setLogs(next);
        save(KEYS.logs, next);
    };

    const addLog = () => {
        const ml = customMode ? Number(customAmt) : selAmt;
        if (!ml || ml <= 0) return;

        const newEntry: DrinkLog = { id: Date.now(), ml, type: selType, ts: Date.now() };
        handleUpdateLogs([newEntry, ...logs]);

        setPop(true);
        setTimeout(() => setPop(false), 500);
        setCustomAmt("");
        setCustomMode(false);
    };

    const saveGoal = () => {
        setGoal(goalInput);
        save(KEYS.goal, goalInput);
        setGoalModal(false);
    };

    return (
        <div className="home-page-container">
            <header className="flex justify-between items-start">
                <div className="status-text">
                    <p className="date-label">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</p>
                    <h1 className="status-title">{stats.pct >= 100 ? "Goal reached! 🎉" : stats.pct >= 60 ? "Keep going! 🌊" : "Stay hydrated! 💧"}</h1>
                </div>
                <button onClick={() => setGoalModal(true)} className="goal-badge">
                    <span className="goal-label">Goal</span>
                    <span className="goal-value">{goal}L</span>
                </button>
            </header>

            <div className="flex justify-center py-2">
                <div className={`progress-wrapper ${pop ? 'pop-active' : ''}`}>
                    <CircleProgress pct={stats.pct} total={goal} current={stats.totalL} />
                </div>
            </div>

            <SummaryCards stats={stats} goal={goal} />

            <section className="quick-add">
                <p className="section-label">Quick add</p>
                <div className="scroll-x-container">
                    {QUICK_AMOUNTS.map(q => (
                        <button
                            key={q.ml}
                            onClick={() => { setSelAmt(q.ml); setCustomMode(false); }}
                            className={`amount-btn ${selAmt === q.ml && !customMode ? 'active' : ''}`}
                        >
                            <span className="icon">{q.icon}</span>
                            <span className="ml">{q.ml}ml</span>
                        </button>
                    ))}
                    <button onClick={() => setCustomMode(true)} className={`amount-btn ${customMode ? 'active' : ''}`}>
                        <span className="icon">✏️</span>
                        <span>Custom</span>
                    </button>
                </div>
            </section>

            {customMode && (
                <Card className="p-3 animate-in">
                    <TI type="number" value={customAmt} onChange={e => setCustomAmt(e.target.value)} placeholder="Amount in ml..." />
                </Card>
            )}

            <Btn onClick={addLog} className="log-btn">💧 LOG DRINK</Btn>

            <TodayFeed logs={stats.todayLogs} onRemove={(id) => handleUpdateLogs(logs.filter(l => l.id !== id))} />

            <Modal open={goalModal} onClose={() => setGoalModal(false)} title="Daily goal 🎯">
                <GoalSelector value={goalInput} onChange={setGoalInput} onSave={saveGoal} />
            </Modal>
        </div>
    );
}