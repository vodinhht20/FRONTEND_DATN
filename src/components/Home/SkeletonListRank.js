import Skeleton from '@mui/material/Skeleton';
import { Avatar, Row, Col } from 'antd';

const SkeletonCustomiz = () => {
    return (
        <Row gutter={[12, 12]} className="skeleton-list-rank-item" align="middle">
                <Col span={4}>
                    <Skeleton/>
                </Col>
                <Col span={16}>
                    <Row gutter={[24, 0]}>
                        <Col span={4}>
                            <Skeleton animation="wave" variant="circular" width={40} height={40} />
                        </Col>
                        <Col span={20}>
                            <Skeleton />
                            <Skeleton style={{ width: "80%" }}/>
                        </Col>
                    </Row>
                </Col>
                <Col span={4}>
                    <Skeleton/>
                </Col>
        </Row>
    )
}

export default function SkeletonListRank ({length}) {
    var elements = [];
    for (let index = 0; index < length; index++) {
        elements.push(<SkeletonCustomiz key={"skeleton_customiz_" + index}/>);
    }
    return <>{elements}</>;
}