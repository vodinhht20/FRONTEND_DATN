import { Empty, Select, Typography, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { routeSearch } from '~/routeSearch';

const { Option } = Select;
const { Text } = Typography;

const InputSearch = (props) => {
  const [dataSearch, setDataSearch] = useState([
    {name: 'Chấm công', link: "cham-cong"},
    {name: 'Bảng công', link: "bang-cong"},
    {name: 'Thống kê', link: "thong-ke"},
  ]);

  const handleSearch = value => {
    if (value) {
      setDataSearch(routeSearch.filter(data => data.name.toLowerCase().includes(value.toLowerCase())));
    } else {
      setDataSearch([]);
    }
  };

  const handleChange = value => {
    setDataSearch(value);
  };
  const options = dataSearch.map((dataItem, index) => {
    return (
      <Option key={index++} value={dataItem.name}><Link to={'/'+dataItem.link}>{dataItem.name}</Link></Option>
    )
  });
    return (
      <Row>
        <Col span={4}>
          <Text style={{ color: '#ffff', minWidth: 'max-content' }}>Tìm kiếm</Text>
        </Col>
        <Col span={20}>
          <Select
            showSearch
            value={dataSearch}
            placeholder={props.placeholder}
            style={props.style}
            showArrow={true}
            filterOption={true}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          >
            { options }
          </Select>
        </Col>
      </Row>
    );
}

export default InputSearch;