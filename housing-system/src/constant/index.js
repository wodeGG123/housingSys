import { getEmployeeList } from '@/api/baseinfos/employee'
import { getUnitList } from '@/api/baseinfos/unit'

export function getAllUnitList () {
  return new Promise((resolve, reject) => {
    getUnitList().then(res => {
      const data = res.data
      if (data.result && data.data) { 
        resolve(data.data)
      }
    })
  })
}

export function getAllEmployeeList () {
  return new Promise((resolve, reject) =>{
    getEmployeeList().then(res => {
      const data = res.data
      if (data.result && data.data) { 
        resolve(data.data)
      }
    })
  })
}
