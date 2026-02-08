import React, { useState } from 'react';
import Table from '../common/table';
import ResidentRow from './ResidentRow';
import ResidentDetailsModal from './ResidentDetailsModal';

const ResidentTable = ({ residents, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);
  const [modalMode, setModalMode] = useState('view');

  // "Status" header removed
  const headers = ["Name", "Age", "Address", "Purok", "Sector", "Actions"];

  const handleView = (resident) => {
    setSelectedResident(resident);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleEdit = (resident) => {
    setSelectedResident(resident);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      console.log("Deleting:", id);
    }
  };

  return (
    <>
      <Table headers={headers}>
        {residents.length > 0 ? (
          residents.map((r) => (
            <ResidentRow 
              key={r.id} 
              r={r} 
              onView={handleView} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          ))
        ) : (
          <tr>
            {/* colSpan updated to 6 */}
            <td colSpan={6} className="px-6 py-24 text-center text-lg font-black text-slate-400 uppercase tracking-widest">
              No records found.
            </td>
          </tr>
        )}
      </Table>

      <ResidentDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        resident={selectedResident}
        mode={modalMode}
        onSave={(data) => {
          onUpdate(data);
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

export default ResidentTable;