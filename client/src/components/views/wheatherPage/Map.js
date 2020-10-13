import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { API_URL } from './Config';
import styled from 'styled-components';
import {Row, Col } from "antd";

const BorderBar = styled.div`
    border: 2px solid black;
`;

const IconBlock = styled.div`
  width:auto;
  height:120px;
  background-position:center,center;
  position:relative;
  background-size:contain;
  background-repeat:no-repeat;
  background:url('${props=>props.image}');
`;
const WeatherBlock = styled.div`
    margin:0 auto;
    border-radius:16px;
    width:80%;
    margin-top:50px;
`;

const GridBox = styled.div`
    padding: .75rem 1.25rem;
    border: 1px solid transparent;
    border-radius: .25rem;
`;
const GridBox1 = styled(GridBox)`
    color: #004085;
    background-color: #cce5ff;
    border-color: #b8daff;
`;

const GridBox2 = styled(GridBox)`
    color: #0c5460;
    background-color: #d1ecf1;
    border-color: #bee5eb;
`;
const GridBox3 = styled(GridBox)`
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
`;
const GridBox4 = styled(GridBox)`
    color: #383d41;
    background-color: #e2e3e5;
    border-color: #d6d8db;
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
const GridBlock = styled.div`

`;
const Map=()=> {
  const [currentData,setCurrentData]= useState([]);
  const [Data, setData] = useState([]);
  const [weather,setWeather]=useState([]);
  const [time, setTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uvi, setuvi] = useState('');
  const [dailyData, setdailyData] = useState([]);
  const [temp,setTemp] = useState([]);

  const Test = ["1","2","3","4","5","6","7","8",1,1,1,1,1,1,1,1]
  const Test2 = [
    
  ]

  
  useEffect((longitude,latitude) => {
    const fetchlotaion=()=>{
      if('geolocation' in navigator) {
        /* 위치정보 사용 가능 */
        navigator.geolocation.getCurrentPosition((pos)=> {
          const latitude = pos.coords.latitude;
          const longitude = pos.coords.longitude;
          alert("현재 위치는 : " + latitude + ", "+ longitude);
          const URL =`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=kr&
          exclude=hourly,daily&appid=c13cc1190412a125332e2bf4620fa404`;
          fetchData(URL);
      });
      } else {
        /* 위치정보 사용 불가능 */
        alert('위치 못가져옴');
      }
    };
    fetchlotaion();
  }, []);
  
  const fetchData = async(URL)=>{
    try{
      setLoading(true);
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
console.log(Data)
console.log(dailyData)

const icon = weather.icon;
console.log(icon)
let iconurl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <>
    <WeatherBlock>
              <Row gutter={[16, 16]}>
                <Col span={24} style={{textAlign:"center"}} >
                      {/* <Icon image={iconurl}/> */}
                      <img style={{width:"120px"}} src= {iconurl} />
                  </Col>
                <Col lg={4} md={12} xs={12}>
                  <GridBox1>
                     강수확률: {Math.round(dailyData.pop*100)}%
                  </GridBox1>
                </Col>
                <Col lg={4} md={12} xs={12}>
                  <GridBox2>
                  현재 온도: {Math.round(currentData.temp-273.15)}
                  </GridBox2>
                </Col>
                <Col lg={4} md={12} xs={12}>
                  <GridBox3>  
                  날씨: {weather.description}
                  </GridBox3>
                  </Col>
                <Col lg={4} md={12} xs={12}>
                  <GridBox4>
                  습도: {currentData.humidity}%
                  </GridBox4>
                  </Col>
                <Col lg={4} md={12} xs={12}>
                  <GridBox1>
                  바람: {currentData.wind_speed}m/s
                  </GridBox1>
                  </Col>
                <Col lg={4} md={12} xs={12}>
                  <GridBox2>
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
                  </GridBox2>
                  </Col>
             </Row>
             <TtitleBlock>
                <h1>당신을 위한 추천</h1>
             </TtitleBlock>
    </WeatherBlock>
    </>
  )
};

function Icon(props){
  return(
      <IconBlock image={props.image}/>
  )
}

export default Map;
