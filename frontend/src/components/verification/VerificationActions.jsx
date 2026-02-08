import React from 'react';
import Button from '../common/Button';

const VerificationActions = ({ onApprove, onReject, onVisitBgy }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full md:w-[500px]"> 
      <Button 
        label="Visit Bgy" 
        variant="secondary" 
        onClick={() => onVisitBgy('For Verification')}
        className="h-full" 
      />
      <Button 
        label="Disapprove" 
        variant="outline" 
        onClick={onReject} 
        className="h-full border-red-500 text-red-500"
      />
      <Button 
        label="Approve" 
        variant="primary" 
        onClick={onApprove} 
        className="h-full bg-emerald-600"
      />
    </div>
  );
};
export default VerificationActions;