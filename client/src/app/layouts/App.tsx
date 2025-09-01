
import { useEffect, useState } from 'react'
import './styles.css'
import { Container, CssBaseline, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import NavBar from './navbar';

function  App() {

  const[activities, setActivities]= useState<Activity[]>([]);
  useEffect(()=> {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))
  },[])

  return (
    <>
    <CssBaseline/>
    <NavBar/>
    <Container maxWidth='xl' sx={{mt: 3}}>
            <List>
            {activities.map((activity)=>(
              <ListItem key={activity.id}>
                <ListItemText> {activity.title}</ListItemText> 
                </ListItem>
            ))}
          </List>
    </Container>

    </>

  )
}

export default App
