import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'


const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function UserDetails() {
    const classes = useStyles();
    let userDetail = useSelector(state => state.currUserDetails)
    const dispatch = useDispatch();
    const { userId } = useParams();
    useEffect(() => {
        if (userId && userId !== '') {
            dispatch(getUserDetailsThunk(userId));
        }
    }, [userId, dispatch]);
    let currUserDetails = userDetail.success.data;
    // return ();
}

export default UserDetails;