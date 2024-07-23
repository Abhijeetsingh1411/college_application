import React from "react"

import Login from "./Components/LoginPage"
import StudentInterface from "./Components/StudentInterface"
import FacultyMemberInterface from "./Components/FacultyMemberInterface"
import ManageRecords from "./Components/ManageRecords"
import Dashboard from "./Components/Dashboard"


function App() {
  

  return (
    <>
    
      <Login/>
     
       <StudentInterface/>
     
      <FacultyMemberInterface/>

       <ManageRecords/>
      {/* <Dashboard/> */}
          
    </>
  )
}

export default App
