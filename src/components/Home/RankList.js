import React, { useState, useEffect } from 'react';
import { List, message, Avatar } from 'antd';
import VirtualList from 'rc-virtual-list';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

const RankList = ({data}) => {
    return (
        <List>
            <VirtualList
                data={data}
                height={300}
                itemHeight={47}
                itemKey="email"
            >
                {item => (
                <List.Item key={item.name} className="user-item">
                    <span className="text-info checkin-time">06:41</span>
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar} size="large"/>}
                        title={<a href="https://ant.design">{item.name}</a>}
                        description={item.role}
                        className="user-info"
                    />
                    <div className="current-rank">
                        <span className="text-info">#{item.rank}</span>
                        {
                            item.up_rank ?
                            <span className="icon-rank icon-up"><ArrowUpOutlined /></span>
                            :
                            <span className="icon-rank icon-down"><ArrowDownOutlined /></span>
                        }
                    </div>
                </List.Item>
                )}
            </VirtualList>
        </List>
    );
}
export default RankList;