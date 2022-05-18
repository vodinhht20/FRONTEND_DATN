import { Fragment } from 'react';
import { CardActionArea, CardActions, CardContent, CardMedia, Skeleton, Typography } from '@mui/material';
import CarMUI from '@mui/material/Card';

const SkeletonCard = () => {
    return (
        <>

            <CarMUI >
                <CardActionArea>
                    <Skeleton sx={{ height: 160 }} animation="wave" variant="rectangular" />
                    <Fragment >
                        <div style={{ padding: "4px 15px" }} >
                            <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
                            <Skeleton animation="wave" height={20} width="80%" style={{ marginBottom: 6 }} />
                            <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
                            <Skeleton animation="wave" height={20} width="80%" style={{ marginBottom: 6 }} />
                        </div>
                    </Fragment>
                </CardActionArea>
                <CardActions>
                    <Skeleton animation="wave" height={20} width="80%" style={{ marginBottom: 6, display: "block", margin: "10px auto" }} />
                </CardActions>
            </CarMUI>
        </>
    );
}
export default SkeletonCard;