import {
    Grid,
    IconButton,
    Typography,
    Card,
    CardHeader,
    CardContent,
    List,
    ListItem,
    Divider,
  } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import {useState} from 'react';
import axios from 'axios';

export default function MoiveRating() {
    let [movies, setMovies] = useState([]);

    function handleClick() {
        axios.get('/recommendation')
        .then(res => setMovies(res.data))
        .catch(err => console.log(err));
    }

    return(
        <Grid container spacing={4}>
            <Grid item sx={12}>
                <Typography variant="body1">点击获取电影推荐</Typography>
                <IconButton aria-label="refresh"  onClick={handleClick}>
                    <RefreshIcon/>
                </IconButton>
            </Grid>
            {
                movies.length > 0 ?
                movies.map(movie =>
                <Grid item sx={6} key={movie._id}>
                    <Card >
                        <CardHeader title={movie.primaryTitle} subheader={movie.titleType}/>
                        <CardContent>
                        <List>
                            <ListItem>
                                <Typography variant="body1">
                                    是否为成人电影：{movie.isAdult?"是":"否"}
                                </Typography>
                                <Divider />
                            </ListItem>
                            <ListItem>
                                <Typography variant="body1">
                                    拍摄时间：{movie.startYear}
                                </Typography>
                                <Divider />
                            </ListItem>
                            <ListItem>
                                <Typography variant="body1">
                                    电影时长：{movie.runtimeMinutes}
                                </Typography>
                                <Divider />
                            </ListItem>
                            <ListItem>
                                <Typography variant="body1">
                                    体裁：{movie.genres.join(' ')}
                                </Typography>
                                <Divider />
                            </ListItem>
                        </List>
                        </CardContent>
                    </Card>
                    </Grid>
                ) : ''
            }
        </Grid>
        
    );
}