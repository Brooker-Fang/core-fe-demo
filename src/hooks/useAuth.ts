import { call } from "core-fe"
import { useEffect } from "react"
import { userActions } from "../view/user"

export const useAuth = () => {
  useEffect(() => {
    function *currentUser() {
      yield* call(userActions.getCurrent)
    }
    currentUser()
  }, [])
}