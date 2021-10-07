import { useState, useEffect } from 'react'
import * as C from './App.styles'
import { Item } from './types/Item'
import { items } from './data/items'
import { categories } from './data/categories'
import { getCurrentMonth, filterListByMonth } from './helpers/dateFilter'
import {TableArea} from './components/TableArea'
import {InfoArea} from './components/InfoArea'
import { AddArea } from './components/AddArea'

const App = () => {
  // não precisamos tipar ele pq o nosso item já está tipado
  const [list, setList] = useState(items)
  // o mais bacana é saber que o useState recebe uma função. Js é pirado msm kkk
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth())

  // agora vamos criar uma lista filtrada com os items por mes
  // nesse caso como o state inicia com o [] vazio, precisamos tipar
  const [filteredList, setFilteredList] = useState<Item[]>([])

  // aqui vamos calcular o valor total e o saldo e enviar para o InfoArea
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)

  /* vamos explicar aqui a lógica: quando adicionarmos um item na lista
  ele vai para a lista geral 'list' e temos que filtrar para só então
  enviar para o 'filteredList'. Nesse caso precisamos monitorar o 'list' e também o 'currentMonth' com o useEffect. */

  useEffect(() => {
    setFilteredList(filterListByMonth(list, currentMonth))
  },[list, currentMonth])

  // aqui vamos monitorar a lista filtrada para somar o que é saldo ou despesa
  useEffect(() => {
    let incomeCount = 0
    let expenseCount = 0

    for(let i in filteredList) {
      if(categories[filteredList[i].category].expense){
        expenseCount += filteredList[i].value
      } else {
        incomeCount += filteredList[i].value
      }
    }

    setIncome(incomeCount)
    setExpense(expenseCount)
  }, [filteredList])

  // essa função vai receber o mes para ser alterado do componente InfoArea
  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth)
  }

  const handleAddItem = (item: Item) => {
    let newList = [...list]
    newList.push(item)
    setList(newList)
  }

  return (
    <C.Container>
      <C.Header>
        <C.HeaderText>Sistema Financeiro</C.HeaderText>
      </C.Header>
      <C.Body>

        {/* área de informações */}
        <InfoArea 
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          income={income}
          expense={expense}
        />

        {/* área de inserção */}
        <AddArea onAdd={handleAddItem}/>

        {/* tabeça de itens */}
        <TableArea list={filteredList}/> 

      </C.Body>
    </C.Container>
  )
}

export default App 