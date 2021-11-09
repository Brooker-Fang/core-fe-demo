
import { Button, Select } from 'antd'
import { call } from 'core-fe'
import { SagaGenerator } from 'core-fe/src'
import React, { useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { productActions } from '..'
import { useDebounceValue } from '../../../hooks/useDebounce'
import { RootState } from '../../../type/state'
import { CategoryState } from '../../category/type'
interface Props {
  searchProduct?: (search: string, category: string) => void
}
export const Search = ({searchProduct}: Props) => {
  const { list : categoryList } = useSelector<RootState, CategoryState>(state => state.app.category)
  const [search, setSearch] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const handleSelectChange = useCallback(
    (val) => {
      setCategory(val)
    },
    [],
  )
  const debouncedSearch = useDebounceValue(search, 500);
  useEffect(() => {
    if (debouncedSearch) {
      const fetchResults = function *() : SagaGenerator {
       yield *call(productActions.list, debouncedSearch)
      }
      fetchResults()
    }
  }, [debouncedSearch]);
  return (
    <>
      <Select defaultValue="All" onChange={handleSelectChange}>
          <Select.Option value="All">
            所有分类
          </Select.Option>
          {
            categoryList.map(item => {
              return <Select.Option key={item._id} value={item._id}>
              {item.name}
            </Select.Option>
            })
          }
        </Select>
      <input value={search} onChange={(e) => setSearch(e.target.value)}/>
      <Button onClick={() => 
        searchProduct && searchProduct(search, category)
      }>搜索</Button>
    </>
  )
}
