import React from 'react';
import Table from '../common/table';
import VerificationRow from './VerificationRow';

const PendingVerificationTable = ({ data, onReview }) => {
  const headers = ["Name", "Age", "Address", "Submitted", "Status", "Actions"];

  return (
    <Table headers={headers}>
      {data.length > 0 ? (
        data.map((res, index) => (
          <VerificationRow 
            key={res.id || index} 
            res={res} 
            onReview={onReview} 
          />
        ))
      ) : (
        <tr>
          <td colSpan={5} className="px-6 py-24 text-center text-lg font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">
            No pending verifications found.
          </td>
        </tr>
      )}
    </Table>
  );
};

export default PendingVerificationTable;