import Skeleton from '@mui/material/Skeleton';

const SkeletonLine = () => {
    return (
        <div style={{ padding: "5px 0" }}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
        </div>
    );
}
export default SkeletonLine;