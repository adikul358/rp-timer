import { useState, useEffect } from "react"

const TIMES = [15, 5]
const TIME = TIMES.reduce((p, c) => p+c)

const ClockDigits = ({ t }) => {
    return (
        <div className={`-mt-16 grid text-right w-max ${t > TIME ? "text-red-500" : t > TIMES[0] ? "text-orange-300" : ""}`} style={{
            fontSize: "300px",
            gridTemplateColumns: "repeat(2, 170px) 95px repeat(2, 170px)"
        }}>
            <span>{Math.floor(t / 600)}</span>
            <span>{Math.floor(t / 60) % 10}</span>
            <span>:</span>
            <span>{Math.floor((t % 60) / 10)}</span>
            <span>{t % 10}</span>
        </div>
    )
}

const ClockBar = ({ t }) => {
    const t1 = t > TIMES[0] ? TIMES[0] : t
    const t2 = t < TIMES[0] ? 0 : t > TIME ? TIMES[1] : t - TIMES[0]

    return (
        <div className="bg-gray-800 h-6 w-[80vw] rounded-full relative">
        <div className={`bg-gray-200 h-6 rounded-full absolute left-0 top-0`} style={{width: `calc(59vw*${t1}/${TIMES[0]})`}}>
        </div>
        <div className="bg-orange-400 h-6 rounded-full absolute left-[60vw] top-0" style={{width: `calc(20vw*${t2}/${TIMES[1]})`}}>
        </div>
        </div>
    )
}

function App() {
    const [status, setStatus] = useState(0)
    const [time, setTime] = useState(0)
    useEffect(() => {
        if (status == 1) {
            let intervalId;
            intervalId = setInterval(() => setTime(time + 1), 1000);
            return () => clearInterval(intervalId);
        }
    }, [time, status]);

    return (
        <div className="flex flex-col justify-center items-center">
            <ClockDigits t={time} />
            <ClockBar t={time} />
            {status == 0 && (
                <button onClick={() => setStatus(1)} className="px-8 py-2 mt-24 rounded-full bg-white text-2xl text-black">Start</button>
            )}
            {status == 1 && (
                <>
                <span 
                    onClick={() => setStatus(1)} 
                    className={`px-8 py-2 mt-[82px] rounded-full text-4xl ${time > TIME ? "text-red-500" : time > TIMES[0] ? "text-orange-300" : "text-white"}`}
                >
                    {time > TIME ? "Time Exceeded" : time > TIMES[0] ? "QnA Time" : "Presentation Time"}
                </span>
                </>
            )}
        </div>
    );
}

export default App;
