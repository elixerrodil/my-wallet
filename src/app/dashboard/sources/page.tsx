import { IncomeSources } from '@/types/sources';
import { PrismaClient } from '@prisma/client';

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
        <h1 className='mb-4 text-2xl font-bold'>Income Sources</h1>
        <table className='min-w-full border border-gray-300'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='border border-gray-300 px-4 py-2 text-left'>ID</th>
              <th className='border border-gray-300 px-4 py-2 text-left'>
                Description
              </th>
              <th className='border border-gray-300 px-4 py-2 text-left'>
                Income
              </th>
              <th className='border border-gray-300 px-4 py-2 text-left'>
                Frequency
              </th>
              <th className='border border-gray-300 px-4 py-2 text-left'>
                Currency
              </th>
              <th className='border border-gray-300 px-4 py-2 text-left'>
                Created Date
              </th>
              <th className='border border-gray-300 px-4 py-2 text-left'>
                Updated Date
              </th>
            </tr>
          </thead>
          <tbody>
            {income_sources.map((source) => (
              <tr
                key={source.id}
                className='hover:bg-gray-100'
              >
                <td className='border border-gray-300 px-4 py-2'>
                  {source.id}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {source.description || 'N/A'}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {source.income !== null ? source.income : 'N/A'}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {source.frequency !== null ? source.frequency : 'N/A'}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {source.currency || 'N/A'}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {source.created_date
                    ? new Date(source.created_date).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {source.updated_date
                    ? new Date(source.updated_date).toLocaleDateString()
                    : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Source;
