/** @format */

import React, { useState } from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import { Icon } from "antd";
import axios from "axios";

const DropBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Box = styled.div`
  width: 300px;
  height: 240px;
  border: 1px solid lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageBox = styled.div`
  display: flex;
  width: 350px;
  height: 240px;
  overflow-x: scroll;
`;
function FileUpload(props) {
  const [Images, setImages] = useState([]);
  const dropHandler = (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    axios.post("/api/product/image", formData, config).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setImages([...Images, res.data.filePath]);
        props.refreshFunction([...Images, res.data.filePath]);
      } else {
        alert("파일을 저장하는데 실패 했습니다.");
      }
    });
  };

  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image);
    let newImages = [...Images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    props.refreshFunction(newImages);
  };
  return (
    <DropBox>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <Box {...getRootProps()}>
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: "3rem" }} />
          </Box>
        )}
      </Dropzone>
      <ImageBox>
        {Images.map((image, index) => (
          <div onClick={() => deleteHandler(image)} key={index}>
            <img
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </ImageBox>
    </DropBox>
  );
}

export default FileUpload;
