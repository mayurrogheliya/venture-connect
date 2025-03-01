import React, { useState } from 'react';
import { Button } from 'antd';
import AdminOpportunityTable from '../../../Components/AdminOpportunity/AdminOpportunityTable';
import SearchBox from '../../../Components/AdminOpportunity/SearchBox';
import AddOpportunity from '../../AddOpportunity';

const AdminOpportunity = () => {
  const [mode, setMode] = useState('table');
  const [searchText, setSearchText] = useState('');

  return (
    <div className="p-6 bg-white rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        {mode === 'table' && (
          <SearchBox
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        )}
        <Button
          type="primary"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => setMode(mode === 'table' ? 'form' : 'table')}
        >
          {mode === 'table' ? '+ Add Opportunity' : 'View Opportunities'}
        </Button>
      </div>

      {mode === 'table' ? (
        <AdminOpportunityTable searchText={searchText} />
      ) : (
        <AddOpportunity onCancel={() => setMode('table')} />
      )}
    </div>
  );
};

export default AdminOpportunity;
