import { useSelector } from "react-redux";
import WheelComponent from "../components/WheelComponent";
import axios from "axios";
import { useState, useEffect, useMemo } from 'react'
import Button from '@mui/material/Button';
import backGroundImage from '../assets/images/bg.png'

import Snackbar from '@mui/material/Snackbar';

import Alert from '@mui/material/Alert';

import { useNavigate } from 'react-router-dom'

const Wheel = () => {
  const segments = [
    '15 Yuan',
    '55 Yuan',
    '100 Yuan',
    '25 Yuan',
    '50 Yuan',
    '70 Yuan',
    '60 Yuan',
    '10 Yuan',
    '45 Yuan',
    '95 Yuan',
    '20 Yuan',
    '85 Yuan',
    '75 Yuan',
    '5 Yuan',
    '30 Yuan',
    '80 Yuan',
    '35 Yuan',
    '90 Yuan',
    '65 Yuan',
    '40 Yuan',
  ]

  const segColors = [
    '#EE4040',
    '#F0CF50',
    '#4d494a',
    '#509658',
    '#5dc969',
    '#4aed5c',
    '#d2ed21',
    '#edb721',
    '#ed8021',
    '#b021ed',
    '#ed4021',
    '#ed4021',
    '#ed4021',
    '#f71647',
    '#f71647',
    '#EE4040',
    '#F0CF50',
    '#4d494a',
    '#509658',
    '#5dc969',
    '#4aed5c',
    '#d2ed21',
    '#edb721',
    '#ed8021',
    '#b021ed',
    '#ed4021',
    '#ed4021',
    '#ed4021',
    '#ed4021',
    '#f71647',
    '#f71647'
  ]
  const userInfo = useSelector((state) => state.users.loginedUserInfo)
  var config;
  const navigate = useNavigate()
  if (userInfo) {
    config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
  }
  else {
    navigate('/signin')
  }

  const [scored, setScored] = useState()
  const [winValue, setWinValue] = useState();
  const [spinStart, setSpinStart] = useState(false);
  const [tryBtnLabel, setTryBtnLabel] = useState('Bet');
  const [initSpin, setInitSpin] = useState(true);

  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;


  const handleClose = () => {
    setState({ ...state, open: false });
  };

  useEffect(() => {

    const fetchAverageValue = async () => {
      await axios.get('http://localhost:8000/api/admin/winningValue/', config).then(res => {
        const aaa = res.data
        setWinValue(aaa)
        return res.data
      });
    }
    fetchAverageValue();
  }, [])

  const onFinished = async (score) => {
    var scores = 0
    scores = score.split(" ")[0]
    setScored(scores)
    if (userInfo) {
      const res = await axios.post('http://127.0.0.1:8000/api/users/score/', {
        score: scores,
        email: userInfo.email
      }, config)
        .then(res => res.data)
        .catch(error => console.log(error))
    }
    setState({ ...state, open: true });
  };

  const onBet = async () => {
    if (tryBtnLabel !== "Bet") {
      setTryBtnLabel("Bet");
      setSpinStart(false);
    } else {
      const value = await axios.get('http://localhost:8000/api/admin/winningValue/', config);
      setWinValue(value.data + " Yuan");
      setSpinStart(true);
      setTryBtnLabel("Init");
    }
  }

  const wheelcontainer = useMemo(() => {
    return (
      <>
        <WheelComponent
          segments={segments}
          segColors={segColors}
          winningSegment={winValue}
          onFinished={(score) => onFinished(score)}
          primaryColor="#4d494a"
          primaryColoraround="#ffffffb4"
          contrastColor="white"
          buttonText=""
          isOnlyOnce={false}
          size={190}
          upDuration={10}
          downDuration={100}
          onStarted={() => { }}
          startSpin={spinStart}
          initSpin={initSpin}
        />
      </>)
  }, [winValue, spinStart])

  return (
    <div id="wheelCircle" style={{ backgroundImage: `url(${backGroundImage})` }}>
      <div style={{ display: 'flex', justifyContent: 'center', height: '93vh' }}>
        <Snackbar
          autoHideDuration={3000}
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
            {"You get " + scored + " Yuan"}
          </Alert>
        </Snackbar>
        {wheelcontainer}
        <Button variant="contained" color="warning" className="mt-5" style={{ width: '120px', height: '50px' }} onClick={onBet} >{tryBtnLabel}</Button>
      </div>
    </div>
  );
}

export default Wheel;