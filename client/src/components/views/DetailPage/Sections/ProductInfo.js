import React from 'react';
import styled from 'styled-components';

const InfoBlock = styled.div`
    
`;

const InfoTitle = styled.div`
    font-size: 22px;
    margin-bottom:8px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
`;

const InfoDesc = styled.div`
    margin-bottom: 18px;
    font-size: 28px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
`;

const InfoLast = styled.div`
    max-width:730px;
    display:flex;
    justify-content:space-around;
    h3{
        font-size:18px;
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
    }
`;
function ProductInfo(props) {
    return (
        <InfoBlock>
            <InfoTitle>
                {props.detail.title}
            </InfoTitle>
            <InfoDesc>
                {props.detail.description}
            </InfoDesc>
        </InfoBlock>
    )
}

export default ProductInfo
