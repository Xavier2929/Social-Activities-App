
import {  useState } from 'react'
import { Box, Container, CssBaseline, Typography} from '@mui/material';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { useActivities } from '../../lib/hooks/useActivities';

function  App() {


  const [selectedActivity, setSelectedActivity]=useState<Activity|undefined>(undefined);
  const[editMode,setEditMode] = useState(false);
  const{activities,isPending} = useActivities();

  const handleSelectActivity = (id: string)=>{
    setSelectedActivity(activities!.find(x=>x.id ===id ));
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

  const handleDelete=(id:string)=>{
    console.log(id);
  }

  const handleSelectedActivity = (id: string)=>{
    setSelectedActivity(activities!.find(x=> x.id === id));

  }





  return (
    <>
    <Box sx={{bgcolor:'#eeeeee', minHeight:'100vh'}}>
      <CssBaseline/>
      <NavBar
      openForm = {handleOpenForm}

      />
      <Container maxWidth='xl' sx={{mt: 3}}>
          {!activities || isPending ? (
            <Typography>Loading...</Typography>
          ):(
          <ActivityDashboard

           activities={activities}
           selectActivity={handleSelectedActivity}
           cancelSelectActivity = {handleCancelSelectedActivity}
           selectedActivity = {selectedActivity}
           editMode={editMode}
           openForm={handleOpenForm}
           closeForm={handleFormClose}
           deleteActivity={handleDelete}
           />
          )}

      </Container>
    </Box>
    </>

  )
}

export default App
