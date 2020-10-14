import React,{useEffect,useState} from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';
import styled from 'styled-components';
import {Icon,Button,Col,Row,Card, Carousel} from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../commons/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import {seasons,gender} from './Sections/Data';
import Map from '../wheatherPage/Map';
const LandingPageBlock =styled.div`
    width:75%;
    margin: 3rem auto;
`;

const TitleBlock = styled.div`
    text-align:center;

    margin-bottom:100px;
`;

const ButtonBlock= styled.div`
    display:flex;
    justify-content:center;
`;
function LandingPage() {
    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [PostSize, setPostSize] = useState(0);
    const [Filters, setFilters] = useState({
        seasons:[],
        gender:[]
    });
    useEffect(() => {
        let body = {
            skip:Skip,
            limit:Limit
        }
        getProducts(body)
    }, [])
    
    const getProducts = (body) =>{
        axios.post('/api/product/products',body)
        .then(res=>{
            if(res.data.success){
                if(body.loadMore){
                    setProducts([...Products,res.data.productInfo])
                }else{
                    setProducts(res.data.productInfo)
                }
                setPostSize(res.data.PostSize)
            }else{
                alert("상품들을 가져오는데 실패 했습니다.")
            }
        })

    }

    const loadMore = () =>{
        let skip = Skip + Limit

        let body = {
            skip:Skip,
            limit:Limit,
            loadMore:true
        }
        getProducts(body)
        setSkip(skip)

    }
    const renderCards = Products.map((product,index) => {
        return <Col lg={8} md={12} xs={24} key={index}>
        <Card
        cover={<ImageSlider images={product.images}
        />}
         bordered={false}
        >
            <Meta 
                title={product.title}
            />  
        </Card>   
        </Col>
    })
    const showFilteredResults = (filters) =>{
        let body = {
            skip:0,
            limit:Limit,
            filters: filters
        }
        getProducts(body)
        setSkip(0)
    }


    const handleFilters = (filters,category) =>{
        const newFilters= {...Filters}   
        newFilters[category] = filters
        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const handleWheather = ()=>{
        
    }

    return (
        <>
            <Map/>
        <LandingPageBlock>

            {/* Filter*/}
            <Row gutter={[16,16]}>
                <Col lg={12}>
                    {/*CheckBox*/}
                    <CheckBox list={seasons}  handleFilters={filters => handleFilters(filters,"seasons")}/>
                </Col>
                <Col lg={12}>
                {/*RadioButton */}
                <RadioBox list={gender} handleFilters= {filters => handleFilters(filters,"gender")}/>
                </Col>
            </Row>
            {/* Search*/}

            {/* Cards*/}
            <Row gutter={[16,16]} style={{marginTop:"100px"}}>        
            {renderCards}
            </Row>
            <br />
            {PostSize >= Limit &&            
            <ButtonBlock>
                <Button onClick={loadMore}>더보기</Button>
            </ButtonBlock>
            }
        </LandingPageBlock>
        </>
    )
}

export default LandingPage
