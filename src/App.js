import React, { useState } from 'react'
import EmployeeList from './EmployeeList'

const App = () => {

  const [num,setNum]=useState(0)
  return (

    <div>
      <h1>Мое приложение для управления сотрудниками</h1>
      <EmployeeList />
    </div>
  )
}

export default App
