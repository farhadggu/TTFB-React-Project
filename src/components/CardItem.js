import { Card, Typography } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { Box } from "@mui/system";
import "./CardItem.css";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { useEffect, useState } from "react";
import axios from "axios";
import boopSfx from "../assets/alert6.mp3"

function CardItem({ title, logo, urls, loop_time }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [time, setTime] = useState(Date.now());
  const [reqList, setReqList] = useState([])
  const ttfbList = [] 
  const audio = new Audio(boopSfx);
  // useEffect(() => {
  //   setInterval(() => {
  //     const start = new Date().getMilliseconds()
  //     axios.get(urls, {timeout: 10000})
  //     .then(function(resp) {
  //       const end = new Date().getMilliseconds()
  //       if(ttfbList.length === 10) {
  //         ttfbList.shift((end-start)/1000)
  //       }
  //       ttfbList.push((end-start)/1000)
  //       setReqList(ttfbList)
  //     })
  //     .catch(function(err) {
  //       if(ttfbList.length === 10) {
  //         ttfbList.shift('Error')
  //       }
  //       ttfbList.push('Error')
  //       setReqList(ttfbList)
  //     })
  //   }, Number(loop_time))
  // }, [])

  useEffect(() => {
    setInterval(() => {
      axios.interceptors.request.use(function (config) {
        config.metadata = {startTime: new Date()}
        return config
      })
      axios.interceptors.response.use(function (response) {
        response.config.metadata.endTime = new Date()
        response.duration = response.config.metadata.endTime - response.config.metadata.startTime
        return response
      })
      axios.get(urls, {timeout: 10000})
      .then(function(resp) {
        if(resp.duration > 2000) {
          audio.play()
        }
        if(ttfbList.length === 10) {
          ttfbList.shift(resp.duration/1000)
        }
        ttfbList.push(resp.duration/1000)
        setReqList(ttfbList)

      }).catch(function(err) {
        audio.play()
        if(ttfbList.length === 10) {
          ttfbList.shift('Error')
        }
        ttfbList.push('Error')
        setReqList(ttfbList)
      })
    }, Number(loop_time))
  }, [])

  
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    console.log('intervaled');
    return () => {
      clearInterval(interval);
    };
  }, []); 

  return (
    <Card
      sx={{
        minWidth: '230px',
        height:'240px',
        borderRadius: "20px",
        boxShadow:Array.from(reqList).reverse().map((item) => item === 'Error' ? "1px 1px 51px 0px rgba(208,17,24, 0.5)" : ( item > 1 && item < 2) ? "1px 1px 51px 0px rgba(255,144,0, 0.5)" : (item > 2) ? "1px 1px 51px 0px rgba(208,17,24, 0.5)" : "1px 1px 51px 0px rgba(75,181,67, 0.5)"),
        background: colors.card[500],
        padding: '10px'
      }}
    >
      <Box display="flex" justifyContent="space-between" height='100%'>
        <Box
          className="left-content"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems='center'
        >
          <Box className="top-content" display="flex" alignItems="center">
            <AccessTimeOutlinedIcon sx={{color: `${colors.text} !important`}} />
            <Typography 
              sx={{color: `${colors.text} !important`}} 
              component='p'
            >
              Last <Typography 
                      fontWeight='bold' 
                      sx={{color: `${colors.text} !important`}} 
                      component='b'
                    >
                      TTFB
                    </Typography>
            </Typography>
          </Box>

          <Box
            className="logo-content"
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="40px"
          >
            <img
              className="logo-img"
              src={logo}
              alt="logo"
            />
            <Typography sx={{color: `${colors.text} !important`}} component="h1">{title}</Typography>
          </Box>
        </Box>
        <Box className="requests-result" display='flex' flexDirection='column-reverse'>
          {reqList.map((item, index) => {
            return (
              <Typography key={index} color={
                item == 'Error' ? 'red' : ( item > 1 && item < 2) ? 'orange' : (item > 2) ? 'red' : 'green'
              } className={index === 9 ? "first-request-list" : 'request-lists'}>
                {item} {index===9 && item !== 'Error' ? <span>s</span> : null}
              </Typography>
            )
          })}
        </Box>
      </Box>
    </Card>
  );
}

export default CardItem;
