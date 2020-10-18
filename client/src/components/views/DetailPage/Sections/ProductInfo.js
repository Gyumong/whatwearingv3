import React from 'react';
import styled from 'styled-components';

const InfoBlock = styled.div`
    
`;

const InfoTitle = styled.div`
    font-size: 22px;
    margin-bottom:8px;
`;

const InfoDesc = styled.div`
    margin-bottom: 18px;
    font-size: 28px;
`;

const InfoLast = styled.div`
    max-width:730px;
    display:flex;
    justify-content:space-around;
    h3{
        font-size:18px;
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
            <InfoLast>
                <h3>{props.detail.sold}</h3>
                <h3>{props.detail.views}</h3>
            </InfoLast>
        </InfoBlock>
    )
}

export default ProductInfo
