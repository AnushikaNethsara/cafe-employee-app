import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000'

export const getEmployeesAPI = async () => axios.get('/employee')

export const getEmployeeByIdAPI = async (id) => axios.get(`/employee/${id}`)

export const createEmployeeAPI = async (employee) => axios.post(`/employee`, employee)

export const updateEmployeeAPI = async (employee) => axios.put(`/employee/${employee.id}`, employee)

export const deleteEmployeeByIdAPI = async (id) => axios.delete(`/employee/${id}`)