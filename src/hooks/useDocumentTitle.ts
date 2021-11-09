import { useEffect } from "react"
export const useDocumentTitle = (title: string, revert: boolean = true) => {
  const oldTitle = document.title
  useEffect(() => {
    document.title = title
    return () => {
      if(revert) {
        document.title = oldTitle
      }
    }
  }, [title, oldTitle, revert])
}