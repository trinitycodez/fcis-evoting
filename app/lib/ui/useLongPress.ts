import { useState, useEffect } from 'react'

const useLongPress = (onLongPress = () => {}, ms = 300) => {
    const [startLongPress, setStartLongPress] = useState(false)
    useEffect(() => {
        let timerID: NodeJS.Timeout | any;
        if (startLongPress) {
            timerID = setTimeout(()=> {
                onLongPress();
                if (navigator.vibrate) {
                    navigator.vibrate(900)
                }
            }, ms)
        } else {
            clearTimeout(timerID)
        }

        return () => {
            clearTimeout(timerID)
        }
    }, [startLongPress, ms, onLongPress])
    const start = () => setStartLongPress(true)
    const stop = () => setStartLongPress(false)
    return {
        onMouseDown: start,
        onMouseUp: stop,
        onMouseLeave: stop,
        onTouchStart: start,
        onTouchEnd: stop,
    }
}

export default useLongPress