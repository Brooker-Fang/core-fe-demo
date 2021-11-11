
import { Button, Input, Select, Form } from 'antd'
import { call } from 'core-fe'
import { SagaGenerator } from 'core-fe'
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
  const onFinish =() =>{}
  return (
    <>
      <Form style={{margin: '10px 0'}} onFinish={onFinish} layout="inline" initialValues={{category: 'All'}}>
      <Input.Group compact>
      <Form.Item name="category">
        <Select onChange={handleSelectChange}>
          <Select.Option value="All">
            所有分类
          </Select.Option>
          {
            categoryList.map(item => {
              return <Select.Option key={item._id} value={item._id || ''}>
              {item.name}
            </Select.Option>
            })
          }
        </Select>
      </Form.Item>
      <Form.Item name="search">
        <Input placeholder="请输入搜索关键字" onChange={(e) => setSearch(e.target.value)}></Input>
      </Form.Item>
      <Form.Item>
        <Button onClick={() => searchProduct && searchProduct(search, category)} type="primary" htmlType="submit">搜索</Button>
      </Form.Item>
      </Input.Group>
    </Form>
    </>
  )
}
