import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api/v1'


//employee apis
export const getEmployeesAPI = async () => axios.get('/employee')

export const getEmployeeByIdAPI = async (id) => axios.get(`employee/employee/${id}`)

export const createEmployeeAPI = async (employee) => axios.post(`/employee`, employee)

export const updateEmployeeAPI = async (employee) => axios.put(`/employee/${employee.id}`, employee)

export const deleteEmployeeByIdAPI = async (id) => axios.delete(`/employee/${id}`)

export const getEmployeeByCafeAPI = async (id) => axios.get(`/employee/employees?cafe=${id}`)



//cafe apis
export const getCafesAPI = async () => axios.get('/cafe/cafes')

export const getCafeByIdAPI = async (id) => axios.get(`/cafe/${id}`)

export const createCafeAPI = async (cafe) => axios.post(`/cafe`, cafe)

export const updateCafeAPI = async (cafe) => axios.put(`/cafe/${cafe.id}`, cafe)

export const deleteCafeByIdAPI = async (id) => axios.delete(`/cafe/${id}`)

export const getCafesByLocationAPI = async (location) => axios.get(`/cafe?location=${location}`)