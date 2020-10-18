import React,{useState} from 'react'
import {Collapse,Radio} from 'antd';

const {Panel} = Collapse;

function RadioBox(props) {

    const [Value, setValue] = useState(1)

    const renderRadioBox= () =>props && props.list.map((value,index)=>(
       
            <Radio key={index} value={value._id}>{value.name}</Radio>

    ))

    const handleChange = (e) =>{
        setValue(e.target.value)
        props.handleFilters([e.target.value])
    }
    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="성별" key="1">
                    <Radio.Group onChange={handleChange} value={Value}>
                    {renderRadioBox()}
                    </Radio.Group>
                </Panel>
            </Collapse>
            
        </div>
    )
}

export default React.memo(RadioBox);
