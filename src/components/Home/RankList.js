import React, { useState, useEffect } from 'react';
import { List, message, Avatar } from 'antd';
import VirtualList from 'rc-virtual-list';
// import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { SkeletonListRank } from '~/components/Home';

const RankList = ({data, loading}) => {
        console.log("Okeeeee", data);
    return (
        <List className="rank-list">
            {
                loading ?
                <SkeletonListRank length={5}/>
                :
                <VirtualList
                    data={data}
                    height={350}
                    itemHeight={47}
                    itemKey="email"
                >
                    {item => (
                    <List.Item key={item.name} className="user-item">
                        <span className="text-info checkin-time">{ item.checkin_at }</span>
                        <List.Item.Meta
                            avatar={<Avatar src={item?.employee?.avatar} size="large"/>}
                            title={<a href="https://ant.design">{item?.employee?.fullname || 'Vô Danh'}</a>}
                            description={item?.employee?.position?.name || ''}
                            className="user-info"
                        />
                        <div className="current-rank">
                            <span className="text-info">#{item.rank}</span>
                            {/* {
                                item.up_rank ?
                                <span className="icon-rank icon-up"><ArrowUpOutlined /></span>
                                :
                                <span className="icon-rank icon-down"><ArrowDownOutlined /></span>
                            } */}
                        </div>
                    </List.Item>
                    )}
                </VirtualList>
            }
        </List>
    );
}
export default RankList;