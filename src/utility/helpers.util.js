export const nowIso = () => new Date().toISOString();

export const randomId = () => {
    const base = Math.random().toString(16).slice(2);
    return `qb_${base}`;
};

export const clampInt = (value, fallback) => {
    const n = Number.parseInt(String(value), 10);
    return Number.isFinite(n) ? n : fallback;
};