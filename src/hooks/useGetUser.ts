import { message } from "antd"
import { useHistory } from "react-router-dom"
import { UserResponse } from "../type/api"

export const useGetUser = (redirectLogin: boolean = true): UserResponse | null => {
  const history = useHistory()
  const currentUserStr = localStorage.getItem('currentUser')
  if(!currentUserStr && redirectLogin) {
    message.warn('请先登录')
    history.push('/login')
    return null
  }
  const currentUser = JSON.parse(localStorage.getItem('currentUser') as string)
  return currentUser
}