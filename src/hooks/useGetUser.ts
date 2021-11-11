import { message } from "antd"
import { useHistory } from "react-router-dom"
import { UserResponse } from "../type/api"

export const useGetUser = (): UserResponse => {
  const history = useHistory()
  const currentUserStr = localStorage.getItem('currentUser')
  const currentUser = JSON.parse(localStorage.getItem('currentUser') as string)
  if(!currentUserStr) {
    message.warn('请先登录')
    history.push('/login')
  }
  return currentUser
}