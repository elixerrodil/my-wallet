import { PrismaClient } from '@prisma/client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ExpenseDetail } from '@/types/expense';

const Expense = async () => {
  const prisma = new PrismaClient();

  const initExpenses = async () => {
    const expenses: ExpenseDetail[] =
      (await prisma.expenses.findMany()) as unknown as ExpenseDetail[];
    prisma.$disconnect();

    return expenses.map((e) => {
      return {
        ...e,
        created_date: e.created_date ? new Date(e.created_date) : null,
        amount: e.amount !== null ? Number(e.amount) : 0
      };
    });
  };

  const expenses: ExpenseDetail[] = await initExpenses();

  return (
    <>
      <Table>
        <TableCaption>A list of your expenses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead className='text-right'>Amount</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Created Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.description}</TableCell>
              <TableCell className='text-right'>{expense.amount}</TableCell>
              <TableCell>{expense.currency}</TableCell>
              <TableCell>{expense.frequency}</TableCell>
              <TableCell>
                {expense.created_date
                  ? expense.created_date.toLocaleDateString()
                  : 'N/A'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Expense;
