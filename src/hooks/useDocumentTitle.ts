import { useEffect, useRef } from "react"
export const useDocumentTitle = (title: string, revert: boolean = true) => {
  const oldTitle = useRef(document.title).current
  useEffect(() => {
    document.title = title
    return () => {
      if(revert) {
        document.title = oldTitle
      }
    }
  }, [title, oldTitle, revert])
}