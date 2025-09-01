import { IncomeSources } from '@/types/source';
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

const Source = async () => {
  const prisma = new PrismaClient();

  // Fetch income sources from the database
  const initIncomeSources = async () => {
    const income_sources: IncomeSources[] =
      (await prisma.income_sources.findMany()) as unknown as IncomeSources[];
    prisma.$disconnect();

    return income_sources.map((source) => ({
      ...source,
      created_date: source.created_date ? new Date(source.created_date) : null,
      updated_date: source.updated_date ? new Date(source.updated_date) : null,
      income: source.income !== null ? Number(source.income) : null
    }));
  };

  const income_sources = await initIncomeSources();

  return (
    <>
      <div className='p-4'>
        <Table>
          <TableCaption>A List of income sources</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>ID</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className='text-right'>Income / Amount</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Updated Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {income_sources.map((source) => (
              <TableRow key={source.id}>
                <TableCell className='font-medium'>{source.id}</TableCell>
                <TableCell>{source.description || 'N/A'}</TableCell>

                <TableCell className='text-right'>
                  {source.income !== null ? source.income : 'N/A'}
                </TableCell>
                <TableCell>{source.currency || 'N/A'}</TableCell>
                <TableCell>{source.frequency || 'N/A'}</TableCell>
                <TableCell>
                  {source.created_date
                    ? source.created_date.toLocaleDateString()
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  {source.updated_date
                    ? source.updated_date.toLocaleDateString()
                    : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Source;
