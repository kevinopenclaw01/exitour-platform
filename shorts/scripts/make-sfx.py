"""쇼츠용 효과음을 직접 합성해 public/sfx/에 저장합니다 (외부 음원·라이선스 없음).

실행: python scripts/make-sfx.py
"""

import wave
from pathlib import Path

import numpy as np

SR = 48000
OUT = Path(__file__).resolve().parent.parent / "public" / "sfx"
rng = np.random.default_rng(7)


def save(name: str, left: np.ndarray, right: np.ndarray | None = None, peak_db: float = -10.0) -> None:
    if right is None:
        right = left
    stereo = np.stack([left, right], axis=1)
    stereo = stereo / (np.max(np.abs(stereo)) + 1e-9) * (10 ** (peak_db / 20))
    pcm = (stereo * 32767).astype("<i2")
    OUT.mkdir(parents=True, exist_ok=True)
    with wave.open(str(OUT / name), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


def fade_edges(x: np.ndarray, ms: float = 4) -> np.ndarray:
    n = int(SR * ms / 1000)
    x[:n] *= np.linspace(0, 1, n)
    x[-n:] *= np.linspace(1, 0, n)
    return x


def lowpass_sweep(x: np.ndarray, cutoff: np.ndarray) -> np.ndarray:
    """시간에 따라 차단 주파수가 바뀌는 1차 로우패스"""
    y = np.zeros_like(x)
    a = 1 - np.exp(-2 * np.pi * cutoff / SR)
    acc = 0.0
    for i in range(len(x)):
        acc += a[i] * (x[i] - acc)
        y[i] = acc
    return y


def whoosh() -> None:
    dur = 0.42
    n = int(SR * dur)
    t = np.linspace(0, 1, n)
    noise = rng.standard_normal(n)
    shape = np.sin(np.pi * np.clip(t / 0.95, 0, 1)) ** 1.6
    cutoff = 400 + 5200 * np.sin(np.pi * t) ** 2
    low = lowpass_sweep(noise, cutoff)
    band = low - lowpass_sweep(low, np.full(n, 250.0))
    sig = band * shape
    pan = 0.5 + 0.35 * np.sin(np.pi * (t - 0.5))
    save("whoosh.wav", fade_edges(sig * (1.2 - pan)), fade_edges(sig * (0.2 + pan)), peak_db=-14)


def pop() -> None:
    dur = 0.16
    n = int(SR * dur)
    t = np.arange(n) / SR
    freq = 320 + 700 * np.exp(-t / 0.018)
    phase = 2 * np.pi * np.cumsum(freq) / SR
    env = (1 - np.exp(-t / 0.002)) * np.exp(-t / 0.035)
    sig = np.sin(phase) * env
    save("pop.wav", fade_edges(sig, 2), peak_db=-12)


def ding() -> None:
    dur = 1.1
    n = int(SR * dur)
    t = np.arange(n) / SR
    sig = np.zeros(n)
    for f0, delay, gain in [(1046.5, 0.0, 1.0), (1568.0, 0.06, 0.8)]:
        tt = np.clip(t - delay, 0, None)
        on = (t >= delay).astype(float)
        for mult, g, tau in [(1.0, 1.0, 0.45), (2.0, 0.25, 0.18), (3.01, 0.08, 0.09)]:
            sig += on * gain * g * np.sin(2 * np.pi * f0 * mult * tt) * np.exp(-tt / tau)
    sig *= 1 - np.exp(-t / 0.003)
    save("ding.wav", fade_edges(sig, 6), peak_db=-15)


def thud() -> None:
    dur = 0.4
    n = int(SR * dur)
    t = np.arange(n) / SR
    freq = 48 + 110 * np.exp(-t / 0.04)
    phase = 2 * np.pi * np.cumsum(freq) / SR
    body = np.sin(phase) * np.exp(-t / 0.13)
    click = lowpass_sweep(rng.standard_normal(n), np.full(n, 2500.0)) * np.exp(-t / 0.012) * 0.6
    save("thud.wav", fade_edges(body + click, 3), peak_db=-9)


if __name__ == "__main__":
    whoosh()
    pop()
    ding()
    thud()
    print("saved to", OUT)
