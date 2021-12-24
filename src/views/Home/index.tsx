import Page from "../../components/Page";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function Home(){
    
    return <Page headerTitle={"Home"}>
        <>
        <div className="orders">
            <div className="orders-headers">
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
                >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />

                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
            <Button sx={{ml: 2}} variant="contained" disableElevation>
                Create Order +
            </Button>
            </div>
        </div>
        </>
    </Page>
}