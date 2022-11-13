import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useState } from 'react';
import {Button} from '@mui/material';
import axios from 'axios';

export default function RatingPicker(props) {
    const [rating, setRating] = useState(3);

    function handleSubmit() {
        if (rating > 3) {
            const formData = new FormData();
            formData.append('movie_id', props.movieId);

            axios.post('/rating', formData)
            .catch(err => console.log(err));
        }
    }

    return (
        <div>
            {
                rating >= 1 ?  <StarIcon value={1} onClick={()=> setRating(1)}/> : <StarBorderIcon value={1} onClick={()=> setRating(1)}/>
            }
            {
                rating >= 2 ?  <StarIcon value={2} onClick={()=> setRating(2)}/> : <StarBorderIcon value={2} onClick={()=> setRating(2)}/>
            }
            {
                rating >= 3 ?  <StarIcon value={3} onClick={()=> setRating(3)}/> : <StarBorderIcon value={3} onClick={()=> setRating(3)}/>
            }
            {
                rating >= 4 ?  <StarIcon value={4} onClick={()=> setRating(4)}/> : <StarBorderIcon value={4} onClick={()=> setRating(4)}/>
            }
            {
                rating >= 5 ?  <StarIcon value={5} onClick={()=> setRating(5)}/> : <StarBorderIcon value={5} onClick={()=> setRating(5)}/>
            }

            <Button onClick={handleSubmit}>确认</Button>
        </div>
    )
}