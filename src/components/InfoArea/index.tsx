import * as C from './styles'
import { formatCurrentMonth } from '../../helpers/dateFilter'
import { ResumeItem } from '../../components/ResumeItem'

type Props = {
    currentMonth: string;
    onMonthChange: (newMonth: string) => void;
    income: number;
    expense: number;
}

export const InfoArea = ({ currentMonth, onMonthChange, income, expense }: Props) => {

    const handlePrevMonth = () => {
        /* Importante lembrar aqui que não podemos somar ou diminuir apenas
        pois no caso de janeiro vai ao mes 0 ou de dezembro vai ao mes 13.
        Nesse caso temos que diminuir do próprio date que já faz esse 
        cálculo para a gente. */
        let [year, month] = currentMonth.split('-');
        let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1) // nesse caso o 1 no final é o dia.
        currentDate.setMonth(currentDate.getMonth() - 1)
        onMonthChange(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`)
    }

    const handleNextMonth = () => {
        let [year, month] = currentMonth.split('-');
        let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1) // nesse caso o 1 no final é o dia.
        currentDate.setMonth(currentDate.getMonth() + 1)
        onMonthChange(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`)
    }

    return (
        <C.Container>
            <C.MonthArea>
                <C.MonthArrow onClick={handlePrevMonth}>⬅️</C.MonthArrow>
                <C.MonthTitle>
                    {formatCurrentMonth(currentMonth)}
                </C.MonthTitle>
                <C.MonthArrow onClick={handleNextMonth}>➡️</C.MonthArrow>
            </C.MonthArea>
            <C.ResumeArea>
                <ResumeItem title="Receitas" value={income}/>
                <ResumeItem title="Despesas" value={expense}/>
                <ResumeItem 
                    title="Balanço" 
                    value={income - expense}
                    color={(income - expense) < 0 ? 'red' : 'green'}
                />
            </C.ResumeArea>
        </C.Container>
    )
}