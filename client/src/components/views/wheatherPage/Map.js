import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { API_URL } from './Config';
import styled from 'styled-components';
import {Row, Col } from "antd";

const BorderBar = styled.div`
    border: 2px solid black;
`;

const IconBlock = styled.div`
  margin-top:1rem;
  width:auto;
  height:120px;
  background-position:center,center;
  position:relative;
  background-size:contain;
  background-repeat:no-repeat;
  background:url('${props=>props.image}');
`;


const GirdBar = styled.div`
  width:1100px;
`;
const GridBox = styled.div`
  text-align:center;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 15px;
`;
const GridBorder =styled.div`
  width:100%;
  border-top:1px solid black;
  border-bottom: 1px solid black;
  display:flex;
  justify-content:center;
  align-items:center;
  padding:2rem 0;
`;
const TtitleBlock = styled.div`

  padding: 40px 0 0 0;
  margin-bottom: 30px;
  h1{
    margin: 0;
    text-align: center;
  }
  @media screen and (max-width: 768px){
    height: 52px;
    line-height: 52px;
    padding: 0 8px;
    margin: 0;
    h1{
    font-size: 17px;
    color: #000000;
    font-weight: bold;
    }
  }
`;
const Map=(props)=> {

  const [currentData,setCurrentData]= useState([]);
  const [Data, setData] = useState([]);
  const [weather,setWeather]=useState([]);
  const [time, setTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uvi, setuvi] = useState('');
  const [dailyData, setdailyData] = useState([]);
  const [temp,setTemp] = useState([]);
  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  const [location, setLocation] = useState({});

  useEffect((longitude,latitude) => {
    const fetchlotaion=()=>{
      if('geolocation' in navigator) {
        /* 위치정보 사용 가능 */
        navigator.geolocation.getCurrentPosition((pos)=> {
          const latitude =  pos.coords.latitude;
          const longitude =  pos.coords.longitude;
          const URL =`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=kr&
          exclude=hourly,daily&appid=c13cc1190412a125332e2bf4620fa404`;
          try{
            setLoading(true);
            fetchData(URL)
          }catch(e){
            console.log(e);
          }
          setLoading(false);
        });
      } else {
        /* 위치정보 사용 불가능 */
        alert('위치 못가져옴');
      }
    };
    fetchlotaion();
    if(loading) return <div>로딩중...</div>
  }, []);
  
  const fetchData = async(URL)=>{
    try{
      await setLoading(true);
      const response = await axios.get(URL);
      setData(response.data);
      setCurrentData(response.data.current);
      setWeather(response.data.current.weather[0]);
      setdailyData(...response.data.daily);
      setTemp(response.data.daily[0]);
      
    }catch(e){
      console.log(e);
    }
    setLoading(false);
  };
  if (loading) return <div>로딩중..</div>;
  const icon = weather.icon;
  let iconurl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  
  return (
    <>
              <Row gutter={[16, 16]}>
                <Col span={24} style={{textAlign:"center"}} >
                      {/* <Icon image={iconurl}/> */}
                      <img style={{width:"120px"}} src= {iconurl} />
                  </Col>
             </Row>
              <GridBorder>
              <GirdBar>

             <Row gutter={[16, 16]}>
                <Col lg={4} md={12} xs={12}>
                  <GridBox>
                     강수확률: {Math.round(dailyData.pop*100)}%
                  </GridBox>
                </Col>
                <Col lg={4} md={12} xs={12}>
                  <GridBox>
                  현재 온도: {Math.round(currentData.temp-273.15)}
                  </GridBox>
                </Col>
                <Col lg={4} md={12} xs={12}>
                  <GridBox>  
                  날씨: {weather.description}
                  </GridBox>
                  </Col>
                <Col lg={4} md={12} xs={12}>
                  <GridBox>
                  습도: {currentData.humidity}%
                  </GridBox>
                  </Col>
                <Col lg={4} md={12} xs={12}>
                  <GridBox>
                  바람: {currentData.wind_speed}m/s
                  </GridBox>
                  </Col>
                <Col lg={4} md={12} xs={12}>
                  <GridBox>
                    자외선: {currentData.uvi} {(
                      ()=>{
                        if(0<currentData.uvi && currentData.uvi<=2){
                          return "낮음"
                        }else if(3<currentData.uvi && currentData.uvi<=5){
                          return "보통"
                        }else if(5<currentData.uvi && currentData.uvi<=7){
                          return "높음"
                        }else if(7<currentData.uvi){
                          return "매우 높음"
                        }
                      })()
                    }
                  </GridBox>
                  </Col>
             </Row>
              </GirdBar>
              </GridBorder>
             <TtitleBlock>
                <h1>당신을 위한 추천</h1>
             </TtitleBlock>

    </>
  )
};

function Icon(props){
  return(
      <IconBlock image={props.image}/>
  )
}

export default React.memo(Map);
