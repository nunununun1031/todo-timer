import React, { useEffect, useRef, useState } from "react";
import styles from "./Timer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addTime,
  selectSelectedTodo,
  totalTimeSum,
  resetTime,
} from "../../features/task/taskSlice";
import { Button, Typography } from "@material-ui/core";

const twentyFive = 25 * 60 * 1000;
const five = 5 * 60 * 1000;
const one = 1 * 60 * 1000;

const Timer = ({ todo }) => {
  const selectedTodo = useSelector(selectSelectedTodo);
  const dispatch = useDispatch();

  const [count, setCount] = useState(0);
  const intervalRef = useRef(null); //1

  const bomodolo = () => {
    setCount(count + twentyFive);
    dispatch(addTime(twentyFive));
  };
  const fiveMinute = () => {
    setCount(count + five);
    dispatch(addTime(five));
  };
  const oneMinute = () => {
    setCount(count + one);
    dispatch(addTime(one));
  };

  const start = () => {
    if (intervalRef.current !== null) {
      //タイマーが進んでいる時はstart押せないように//2
      return;
    }
    intervalRef.current = setInterval(() => {
      //3
      setCount((c) => c - 1000);
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current === null) {
      //タイマーが止まっている時はstart押せないように
      return;
    }
    clearInterval(intervalRef.current); //3
    intervalRef.current = null; //3 インターバルを止めたら箱の中身を空にしておく。
  };

  const reset = () => {
    if (intervalRef.current !== null) {
      //タイマーが進んでいる時はreset押せないように//2
      return;
    }
    dispatch(resetTime());
    setCount(0);
    intervalRef.current = null;
  };

  const updateTimer = (t) => {
    let d = new Date(t);
    let h = d.getUTCHours();
    let m = d.getMinutes();
    let s = d.getSeconds();

    h = ("0" + h).slice(-2);
    m = ("0" + m).slice(-2);
    s = ("0" + s).slice(-2);

    return `${h}:${m}:${s}`;
  };

  const timeChange = (t) => {
    return t / (60 * 1000);
  };

  useEffect(() => {
    if (intervalRef !== null && count === 0) {
      dispatch(totalTimeSum(selectedTodo));
      dispatch(resetTime());
      stop();
    }
    if (count > 99 * 60 * 1000) {
      reset();
    }
  }, [count]);

  return (
    <div className={styles.root}>
      <Typography>合計がんばり時間</Typography>
      <Typography>合計: {timeChange(todo.totalTime)}分</Typography>
      <br />
      <Typography>残り時間</Typography>
      {intervalRef.current > 0 || intervalRef.current === null ? (
        <div>{updateTimer(count)}</div>
      ) : (
        <div>00:00:00</div>
      )}
      <br />
      <div className={styles.button_wrapper}>
        <div className={styles.time_button}>
          <Button variant="contained" color="primary" onClick={bomodolo}>
            25分
          </Button>
          <Button variant="contained" color="primary" onClick={fiveMinute}>
            5分
          </Button>
          <Button variant="contained" color="primary" onClick={oneMinute}>
            1分
          </Button>
        </div>
        <div className={styles.setting_button}>
          <Button variant="contained" color="primary" onClick={start}>
            start
          </Button>
          <Button variant="contained" color="primary" onClick={stop}>
            stop
          </Button>
          <Button variant="contained" color="primary" onClick={reset}>
            reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
