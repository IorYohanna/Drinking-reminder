import { useState, useMemo } from "react";
import type { DrinkLog } from "../../type/types";
import { KEYS, WATER_SIZES as SIZES } from "../../utils/constants";
import { save, computeStreak } from "../../utils/utils";
import Modal from "../../components/ui/Modal";
import { GoalSelector } from "../../components/pages/Home/GoalSelector";
import { SummaryCards } from "../../components/pages/Home/SummyCards";
import { CircleProgress } from "../../components/layouts/CircleProgress";
import "./HomePage.css";

interface Props {
    logs: DrinkLog[];
    setLogs: React.Dispatch<React.SetStateAction<DrinkLog[]>>;
    goal: number;
    setGoal: React.Dispatch<React.SetStateAction<number>>;
}

export default function HomePage({ logs, setLogs, goal, setGoal }: Props) {
    const [selSize, setSelSize] = useState<string>("small");
    const [quantity, setQuantity] = useState<number>(1);
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

    const currentSizeObj = SIZES.find(s => s.id === selSize) || SIZES[0];

    const addLog = () => {
        const baseMl = selSize === 'custom' ? Number(customAmt) : currentSizeObj.ml;
        if (!baseMl || baseMl <= 0) return;

        const ml = baseMl * quantity;
        const newEntry: DrinkLog = { id: Date.now(), ml, type: "water", ts: Date.now() };
        const nextLogs = [newEntry, ...logs];

        setLogs(nextLogs);
        save(KEYS.logs, nextLogs);

        setPop(true);
        setTimeout(() => setPop(false), 500);
        setQuantity(1);
        if (selSize === 'custom') setCustomAmt("");
    };

    const saveGoal = () => {
        setGoal(goalInput);
        save(KEYS.goal, goalInput);
        setGoalModal(false);
    };

    return (
        <div className="home-container">
            <div className="header-wave" />

            <div className="content-wrapper">
                <div className={`progress-section ${pop ? 'pop-effect' : ''}`}>
                    <CircleProgress
                        pct={stats.pct}
                        total={goal}
                        current={stats.totalL}
                        onGoalClick={() => setGoalModal(true)}
                    />
                </div>

                <div className="w-full -mt-5">
                    <SummaryCards stats={stats} goal={goal} />
                </div>


                <div className="w-full max-w-95">
                    <h2 className="text-black text-xl mb-2 pl-2">Size</h2>
                    <div className="bg-[#D9D9D9] rounded-[30px] p-1 flex justify-between relative">
                        {SIZES.map(s => (
                            <button
                                key={s.id}
                                onClick={() => {
                                    setSelSize(s.id);
                                    setQuantity(1);
                                }}
                                className={`flex-1 py-1.5 text-center rounded-[30px] text-[15px] transition-all duration-300
                  ${selSize === s.id ? 'bg-[#2D466E] text-[#F5F0E8]' : 'text-black hover:bg-[#c0c0c0]'}`}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-full pl-2 max-w-95">
                    <h3 className="text-black text-[17px]">About</h3>
                    <p className="text-[#43414C] text-[12px] mt-0.5 leading-snug">
                        {currentSizeObj.desc}
                    </p>
                </div>

                <div className="w-full px-2 flex justify-between items-center max-w-95">
                    <div className="flex gap-4 items-center">
                        <span className="text-[#43414C] text-lg">Volume</span>
                        {selSize === 'custom' ? (
                            <input
                                type="number"
                                value={customAmt}
                                onChange={e => setCustomAmt(e.target.value)}
                                className="bg-transparent border-b border-[#43414C] w-15 text-black text-lg outline-none"
                                placeholder="ml"
                            />
                        ) : (
                            <span className="text-black text-xl font-bold">{currentSizeObj.ml * quantity}ml</span>
                        )}
                    </div>

                    <div className="flex items-center justify-between border-2 border-[#43414C] rounded-[30px] bg-[#F5F0E8] px-3 py-1 w-20">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-black font-bold text-lg hover:text-[#2D466E]">-</button>
                        <span className="text-black text-lg">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="text-black font-bold text-lg hover:text-[#2D466E]">+</button>
                    </div>
                </div>

                <div className="w-full flex justify-center">
                    <button onClick={addLog} className="log-button">
                        <img src="/src/assets/LogBtn.png" alt="Log" className="w-60 h-auto" />
                    </button>
                </div>
            </div>

            <Modal
                open={goalModal}
                title="DAILY GOAL"
                backgroundImageUrl="/src/assets/dailyGoal.png"
                backgroundOpacity={0.5}
                onClose={() => setGoalModal(false)}
            >
                <GoalSelector
                    value={goal}
                    onChange={setGoal}
                    onSave={saveGoal}
                />
            </Modal>
        </div>
    );
}