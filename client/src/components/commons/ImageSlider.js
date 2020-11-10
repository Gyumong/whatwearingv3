import React from 'react';
import { Carousel} from 'antd';
import styled from 'styled-components';

const ImageBlock = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    box-sizing: border-box;
    overflow: hidden;
    width:350px;
    height: 400px;
    margin: 0 ;
    padding-top:30px;
    padding-left:20px;
    padding-right:20px;
    img{
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;height: auto;
    max-height: 500px;
    margin-top:30px;
    }
`;
function ImageSlider(props) {

    return (
        <div>
              <Carousel autoplay>
                {props.images.map((image,index)=>(
                    <ImageBlock key={index}>
                        <img 
                            src={`http://localhost:5000/${image}`}/>
                    </ImageBlock>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider
