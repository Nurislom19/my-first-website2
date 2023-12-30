import React, { useState, useEffect } from 'react'
import './EmployeeList.css'

const EmployeeList = () => {
  const [employees, setEmployees] = useState(() => {
    const storedEmployees = localStorage.getItem('employees')
    return storedEmployees ? JSON.parse(storedEmployees) : []
  })

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    age: '',
  })

  const [selectedEmployees, setSelectedEmployees] = useState([])

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees))
  }, [employees])

  const handleInputChange = (e) => {
    setNewEmployee({
      ...newEmployee,
      [e.target.name]: e.target.value,
    })
  }

  const addEmployee = () => {
    if (newEmployee.name && newEmployee.position && newEmployee.age) {
      setEmployees((prevEmployees) => [
        ...prevEmployees,
        {
          id: prevEmployees.length + 1,
          name: newEmployee.name,
          position: newEmployee.position,
          age: newEmployee.age,
        },
      ])
      setNewEmployee({ name: '', position: '', age: '' })
    }
  }

  const deleteEmployee = () => {
    const updatedEmployees = employees.filter(
      (employee) => !selectedEmployees.includes(employee.id)
    )
    setEmployees(updatedEmployees)
    setSelectedEmployees([])
  }

  const editEmployee = (id, newName, newPosition, newAge) => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === id
        ? { ...employee, name: newName, position: newPosition, age: newAge }
        : employee
    )
    setEmployees(updatedEmployees)
  }

  const toggleSelect = (id) => {
    if (selectedEmployees.includes(id)) {
      setSelectedEmployees((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== id)
      )
    } else {
      setSelectedEmployees((prevSelected) => [...prevSelected, id])
    }
  }

  const toggleSelectAll = () => {
    const allIds = employees.map((employee) => employee.id)
    if (selectedEmployees.length === allIds.length) {
      setSelectedEmployees([])
    } else {
      setSelectedEmployees(allIds)
    }
  }

  return (
    <div className="container">
      <h1>Список сотрудников</h1>
      <div className="select-all">
        <input
          type="checkbox"
          checked={selectedEmployees.length === employees.length}
          onChange={toggleSelectAll}
        />
        <span>Выбрать все</span>
      </div>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            <input
              type="checkbox"
              checked={selectedEmployees.includes(employee.id)}
              onChange={() => toggleSelect(employee.id)}
            />
            <span>{employee.name} - {employee.position} - Age: {employee.age}</span>
            <button onClick={() => deleteEmployee()}>
              <i className="delete-icon">&#10007;</i>
              Удалить выбранное
            </button>
            <button
              onClick={() => {
                const newName = prompt('Enter new name:', employee.name)
                const newPosition = prompt('Enter new position:', employee.position)
                const newAge = prompt('Enter new age:', employee.age)
                editEmployee(employee.id, newName, newPosition, newAge)
              }}
            >
              <i className="edit-icon">&#9998;</i>
              Редактировать
            </button>
          </li>
        ))}
      </ul>
      <div className="selected-employees">
        <h2>Избранные сотрудники</h2>
        <ul>
          {employees
            .filter((employee) => selectedEmployees.includes(employee.id))
            .map((employee) => (
              <li key={employee.id}>{employee.name}</li>
            ))}
        </ul>
      </div>
      <div className="form-container">
        <h2>Добавить сотрудника</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={newEmployee.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Position"
            name="position"
            value={newEmployee.position}
            onChange={handleInputChange}
          />
          <input
            type="number"
            placeholder="Age"
            name="age"
            value={newEmployee.age}
            onChange={handleInputChange}
          />
          <button onClick={addEmployee}>
            <i className="add-icon">&#10010;</i>
            Добавить сотрудника
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmployeeList
