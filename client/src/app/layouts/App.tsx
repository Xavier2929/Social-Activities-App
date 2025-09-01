
import { useEffect, useState } from 'react'
import './styles.css'
import { Box, Container, CssBaseline} from '@mui/material';
import axios from 'axios';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function  App() {

  const[activities, setActivities]= useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity]=useState<Activity|undefined>(undefined);
  const[editMode,setEditMode] = useState(false);
  useEffect(()=> {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))
  },[])

  const handleSelectedActivity = (id: string)=>{
    setSelectedActivity(activities.find(activity=> activity.id === id));

  }

  const handleCancelSelectedActivity = ()=>{
    setSelectedActivity(undefined);
  }

  const handleOpenForm =(id? : string)=> {
      if(id) handleSelectedActivity(id);
      else handleCancelSelectedActivity();
      setEditMode(true);
  }

  const handleFormClose = () =>{
      setEditMode(false);

  }

  return (
    <>
    <Box sx={{bgcolor:'#eeeeee'}}>
      <CssBaseline/>
      <NavBar
      openForm = {handleOpenForm}

      />
      <Container maxWidth='xl' sx={{mt: 3}}>
          <ActivityDashboard
           activities={activities}
           selectActivity={handleSelectedActivity}
           cancelSelectActivity = {handleCancelSelectedActivity}
           selectedActivity = {selectedActivity}
           editMode={editMode}
           openForm={handleOpenForm}
           closeForm={handleFormClose}
           />
      </Container>
    </Box>
    </>

  )
}

export default App
