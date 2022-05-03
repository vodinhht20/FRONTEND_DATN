import { Empty, Select, Typography, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import jsonp from 'fetch-jsonp';
import qs from 'qs';
import React from 'react';

const { Option } = Select;
const { Text } = Typography;

let timeout;
let currentValue;

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    const str = qs.stringify({
      code: 'utf-8',
      q: value,
    });
    jsonp(`https://suggest.taobao.com/sug?${str}`)
      .then(response => response.json())
      .then(d => {
        if (currentValue === value) {
          const { result } = d;
          const data = [];
          result.forEach(r => {
            data.push({
              value: r[0],
              text: r[0],
            });
          });
          callback(data);
        }
      });
  }

  timeout = setTimeout(fake, 300);
}

class SearchInput extends React.Component {
  state = {
    data: [],
    value: undefined,
  };

  handleSearch = value => {
    if (value) {
      fetch(value, data => this.setState({ data }));
    } else {
      this.setState({ data: [] });
    }
  };

  handleChange = value => {
    this.setState({ value });
  };

  render() {
    const options = this.state.data.map(dataItem => <Option key={dataItem.value}><Link to={'/'+dataItem.text}>{dataItem.text}</Link></Option>);
    return (
      <Row>
        <Col span={4}>
          <Text style={{ color: '#ffff', minWidth: 'max-content' }}>Tìm kiếm</Text>
        </Col>
        <Col span={20}>
          <Select
            showSearch
            value={this.state.value}
            placeholder={this.props.placeholder}
            style={this.props.style}
            showArrow={true}
            filterOption={true}
            onSearch={this.handleSearch}
            onChange={this.handleChange}
            notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          >
            {options}
          </Select>
        </Col>
      </Row>
    );
  }
}

export default () => <SearchInput placeholder="Search ..." style={{ width: '100%' }} />;