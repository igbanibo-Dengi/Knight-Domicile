"use client"

import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount } from "@/redux/CounterSlice"
import { RootState } from '@/store'

export function Counter() {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div>
            <div>
                Count: {count}
            </div>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <button onClick={() => dispatch(incrementByAmount(5))}>Add 5</button>
        </div>
    )
}