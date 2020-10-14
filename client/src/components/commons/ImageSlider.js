import React from 'react';
import { Carousel} from 'antd';
import styled from 'styled-components';

const ImageBlock = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    box-sizing: border-box;
    overflow: hidden;
    height: auto;
    margin: 0;
    padding-top:30px;
`;
function ImageSlider(props) {

    return (
        <div>
              <Carousel autoplay>
                {props.images.map((image,index)=>(
                    <ImageBlock key={index}>
                        <img style={{width:"100%",maxHeight:"400px"}}
                            src={`http://localhost:5000/${image}`}/>
                    </ImageBlock>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider
