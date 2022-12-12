import Skeleton from '@mui/material/Skeleton';

const SkeletonLine = ({length}) => {
    var elements = [];
    for (let index = 0; index < length; index++) {
        elements.push(<Skeleton key={'skeleton_line_' + index}/>) ;
    }
    return (
        <div style={{ padding: "5px 0" }}>{elements}</div>
    );
}
export default SkeletonLine;