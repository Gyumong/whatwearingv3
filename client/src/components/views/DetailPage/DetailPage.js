import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import {Row,Col} from 'antd';

const DetailBlock = styled.div`
    padding:70px 15px;
    max-width: 1230px;
    margin: 0 auto;
`;

const ProductBlock = styled.div`

`;
function DetailPage() {
    const [Product, setProduct] = useState({});
    const {productId} = useParams();
    useEffect(() => {
        axios.get(`/api/product/product_by_id?id=${productId}&type=single`)
        .then(res=>{
            if(res.data.success){
                setProduct(res.data.product[0])
                console.log(res.data)
            }else{
                alert("정보를 가져오는데 실패 했습니다.")
            }
        })

    }, [])
    return (
        <DetailBlock>
            <ProductBlock>
            <Row gutter={[16,16]}>
                <Col lg={12} sm={24}>

                    <ProductImage detail={Product} />
                </Col>
                <Col lg={12} sm={24}>

                    <ProductInfo detail={Product}/>
                </Col>
            </Row>
            <h1>
            </h1>
            </ProductBlock>
        </DetailBlock>
    )
}

export default DetailPage
