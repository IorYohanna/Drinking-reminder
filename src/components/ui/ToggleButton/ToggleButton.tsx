import "./ToggleButton.css";

interface ToggleBtnProps {
    enabled: boolean;
    onChange: (v: boolean) => void;
}

const ToggleBtn = ({ enabled, onChange }: ToggleBtnProps) => {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={enabled}
            onClick={() => onChange(!enabled)}
            className={`toggle-rail ${enabled ? 'toggle-rail-enabled' : 'toggle-rail-disabled'}`}
        >
            <div
                className={`toggle-handle ${enabled ? 'toggle-handle-enabled' : 'toggle-handle-disabled'}`}
            />
        </button>
    );
};

export default ToggleBtn;