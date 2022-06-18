import { Transaction } from '@models/transaction'
import { Box, Typography } from '@mui/material'
import { TransactionsStatusLable, TransactionStatus, TransactionsTypeLable } from '@utils/constant'
import React from 'react'

interface TransactionsTableProps {
  transactions: Transaction[]
}

export const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  if (transactions.length === 0) {
    return (
      <Box mt={3} className="w100 h100 df aic jcc">
        <Typography>Chưa có giao dịch nào</Typography>
      </Box>
    )
  }

  const sortedTransactionTime = transactions.sort((a, b) => {
    return new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
  })

  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Mã giao dịch
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Ngày giao dịch
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Loại giao dịch
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Ghi chú
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Số lượng token
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Tình trạng
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedTransactionTime.map((transaction) => {
                  const { amount, createAt, type, message, status, relatedId } = transaction

                  return (
                    <tr>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center cp">
                          <div className="flex-shrink-0">
                            <a href="#" className="block relative">
                              {relatedId}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {new Date(createAt).toLocaleString()}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {TransactionsTypeLable[type].label}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{message}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{amount}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold leading-tight">
                          <span
                            aria-hidden="true"
                            className={
                              'absolute inset-0 opacity-50 rounded-full ' +
                              (status === TransactionStatus.SUCCESS
                                ? ' bg-green-200'
                                : status === TransactionStatus.FAILED
                                ? ' bg-red-200'
                                : status === TransactionStatus.HOLD
                                ? 'bg-zinc-200'
                                : status === TransactionStatus.PENDING
                                ? 'bg-amber-200'
                                : '')
                            }
                          ></span>
                          <span className="relative">{TransactionsStatusLable[status].label}</span>
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
