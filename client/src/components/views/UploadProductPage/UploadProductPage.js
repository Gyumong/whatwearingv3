import React,{useState} from 'react';
import styled from 'styled-components';
import {Typography,Button,Form,Input} from 'antd';
import FileUpload from '../../commons/FileUpload';
import Axios from 'axios';

const {TextArea} = Input;

const Seasons=[
    {key:1,value:"Spring"},
    {key:2,value:"Summer"},
    {key:3,value:"Fall"},
    {key:4,value:"Winter"},
];

const Genders=[
    {key:1,value:"남녀공용"},
    {key:2,value:"남자"},
    {key:3,value:"여자"}
];

const UploadBlock = styled.div`
    max-width:700px;
    margin:2rem auto;
`;

const TitleBlock = styled.div`
    text-align:center;
    margin-bottom:2rem;
`;

function UploadProductPage(props) {
    const [Title, setTitle] = useState("");
    const [Desc, setDesc] = useState("");
    const [Gender, setGender] = useState(0);
    const [Season, setSeason] = useState(1);
    const [Image, setImage] = useState([]);

    const onChnageTitle=(e)=>{
        setTitle(e.target.value)
    }

    const onChangeDesc=(e)=>{
        setDesc(e.target.value)
    }

    const onChangeGender=(e)=>{
        setGender(e.target.value)
    }

    const onChangeSeason=(e)=>{
        setSeason(e.target.value)
    }

    const updateImages=(newImages)=>{
        setImage(newImages)
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        if(!Title || !Desc || !Gender || !Season || !Image){
            return alert("모든 값을 넣어주셔야 합니다.")
        }

        // 서버에 채운 값들을 request로 보낸다.
        const body= {
            // 로그인 된 사람의 ID
            writer:props.user.userData._id,
            title:Title,
            description:Desc,
            gender:Gender,
            images:Image,
            seasons:Season
        }
        Axios.post('/api/product',body)
        .then(res=>{
            if(res.data.success){
                alert('상품 업로드에 성공 했습니다.')
                props.history.push('/')
            }else{
                alert('상품 업로드에 실패 했습니다.')
            }
        })
    }
    return (
        <UploadBlock>
            <TitleBlock>
                <h2>상품 업로드</h2>
            </TitleBlock>
            <Form onSubmit={onSubmit}>
                {/*Drop Zone */}
                <FileUpload refreshFunction={updateImages}/>
                <br/>
                <br/>
                <label>이름</label>
                <Input onChange={onChnageTitle} value={Title}/>
                <br/>
                <br/>
                <label>설명</label>
                <TextArea onChange={onChangeDesc} value={Desc}/>
                <br/>
                <br/>
                <label>성별</label>
                <select onChange={onChangeGender} value={Gender}>
                    {Genders.map(i=>(
                        <option key={i.key} value={i.key}>{i.value}</option>
                    ))}
                </select>
                <br/>
                <br/>
                <select onChange={onChangeSeason} value={Season}>
                    {Seasons.map(i=>(
                        <option key={i.key} value={i.key}>{i.value}</option>
                    ))}
                </select>
                <br/>
                <br/>
                <Button type="submit" onClick={onSubmit}>확인</Button>
            </Form>
        </UploadBlock>
    )
}

export default UploadProductPage;