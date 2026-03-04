export const TI = ({ value, onChange, placeholder, type = "text", className = "" }: { value: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; type?: string; className?: string }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full font-caveat text-xl bg-transparent border-2 border-p-ink rounded-md py-2 px-3 outline-none text-p-ink box-border ${className}`}
  />
);