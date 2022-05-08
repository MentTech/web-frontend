import * as React from 'react'
import Modal from '@components/common/Modal/Modal'
import { Box } from '@mui/material'
import { useCategory } from '@hooks/index'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Category } from '@models/mentor'
import { Fragment, useState, useEffect } from 'react'

export interface UpdateMentorCategoryProps {
  show: boolean
  onClose: () => void
  selectedCategory: Category
  onSubmit: (data: any) => void
}

export default function UpdateMentorCategory({
  onClose,
  show,
  selectedCategory,
  onSubmit,
}: UpdateMentorCategoryProps) {
  const [selected, setSelected] = useState<Category | null>(null)
  const modalActions = (
    <>
      <button className="btn btn-active btn-primary" onClick={handleEditCategory}>
        Lưu
      </button>
      <button className="btn btn-active btn-ghost" onClick={onClose}>
        Hủy
      </button>
    </>
  )

  function handleEditCategory() {
    onSubmit(selected?.id)
  }

  const { categories } = useCategory()

  useEffect(() => {
    if (categories && selectedCategory) {
      setSelected(categories.find((category: Category) => category.id === selectedCategory?.id))
    }
  }, [categories, selectedCategory])

  return (
    <Modal
      show={show}
      actions={modalActions}
      onClose={onClose}
      title="Chọn lĩnh vực phù hợp nhất với bạn."
    >
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative flex justify-center mt-1">
          <Listbox.Button className="relative w-80 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected ? selected.name : 'Chọn lĩnh vực'}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-10 max-h-60 w-80 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {categories?.map((category: Category) => (
                <Listbox.Option
                  key={category.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={category}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                      >
                        {category.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </Modal>
  )
}
