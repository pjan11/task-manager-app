import { React, useState } from 'react';
import TaskView from './TaskView';
import ListView from './ListView';
import { Grid } from '@mui/material';

function Home() {
    const [selectedList, setSelectedList] = useState(null);

    const onSelectList = (list) => {
        setSelectedList(list);
    }

    return (
        <Grid container>
            <Grid item xs={2}>
                <ListView onSelectList={onSelectList} />
            </Grid>
            <Grid item xs={10}>
                <TaskView selectedListId={selectedList?.id} />
            </Grid>
        </Grid>
    )
}

export default Home;