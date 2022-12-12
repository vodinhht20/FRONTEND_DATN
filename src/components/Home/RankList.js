import React, { useState, useEffect } from 'react';
import { List, message, Avatar } from 'antd';
import VirtualList from 'rc-virtual-list';
// import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { SkeletonListRank } from '~/components/Home';

const RankList = ({data, loading, type}) => {
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
                        <span className={ type == "rank" ? "text-info checkin-time" : "text-info checkin-time onboard"}>{ type == "rank" ? `#${item.rank}` : "mới" }</span>
                        <List.Item.Meta
                            avatar={<Avatar src={item?.avatar} size="large"/>}
                            title={<a href={item?.avatar}>{item?.fullname || 'Vô Danh'}</a>}
                            description={item?.position?.name || ''}
                            className="user-info"
                        />
                        <div className="current-rank">
                            {/* <span className="text-info"># 1</span> */}
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