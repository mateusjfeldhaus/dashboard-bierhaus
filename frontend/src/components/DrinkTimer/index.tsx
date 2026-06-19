import { useState, useEffect, useRef, useCallback } from "react";
import { StyledTimer } from "./style";

const PRESETS = [
  { label: "30s",   seconds: 30 },
  { label: "1 min", seconds: 60 },
  { label: "3 min", seconds: 180 },
];

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function beep() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.8);
  } catch {}
}

export const DrinkTimer = () => {
  const [total, setTotal] = useState(30);
  const [remaining, setRemaining] = useState(30);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [custom, setCustom] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setRunning(false);
  }, []);

  const reset = useCallback((secs: number) => {
    stop();
    setTotal(secs);
    setRemaining(secs);
    setDone(false);
  }, [stop]);

  const start = useCallback(() => {
    if (remaining === 0) return;
    setDone(false);
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setRunning(false);
          setDone(true);
          beep();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [remaining]);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const handlePreset = (secs: number) => {
    setCustom("");
    reset(secs);
  };

  const handleCustom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustom(val);
    const mins = parseInt(val);
    if (!isNaN(mins) && mins > 0) reset(mins * 60);
  };

  const progress = total > 0 ? (remaining / total) * 100 : 0;
  const circumference = 2 * Math.PI * 36;

  return (
    <StyledTimer $done={done}>
      <div className="timer-presets">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            className={`preset-btn${total === p.seconds && !custom ? " active" : ""}`}
            onClick={() => handlePreset(p.seconds)}
          >
            {p.label}
          </button>
        ))}
        <div className="custom-wrap">
          <input
            type="number"
            min={1}
            max={99}
            placeholder="—"
            value={custom}
            onChange={handleCustom}
            className="custom-input"
          />
          <span className="custom-label">min</span>
        </div>
      </div>

      <div className="timer-body">
        <svg className="timer-ring" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" className="ring-bg" />
          <circle
            cx="40" cy="40" r="36"
            className="ring-fill"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress / 100)}
          />
        </svg>
        <span className="timer-display">{formatTime(remaining)}</span>
      </div>

      <div className="timer-controls">
        {!running ? (
          <button type="button" className="ctrl-btn start" onClick={start} disabled={remaining === 0}>
            {done ? "Reiniciar" : remaining < total ? "Continuar" : "Iniciar"}
          </button>
        ) : (
          <button type="button" className="ctrl-btn pause" onClick={stop}>Pausar</button>
        )}
        {(running || remaining < total) && (
          <button type="button" className="ctrl-btn reset" onClick={() => reset(total)}>↺</button>
        )}
      </div>
    </StyledTimer>
  );
};
