import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Spin, Dropdown, Menu, Tag, Select } from 'antd';
import OppStartupCard from '../../components/Opportunities/OppStartupCard';
import { useOpportunites } from '../../store/useOpportunites';
import { useEffect, useState } from 'react';

const StartupOpportunities = () => {
  const { getStartUpOpportunities, startupopportunities, loading } = useOpportunites();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    domain: [],
    startupstage: [],
    minInvestment: null,
    maxInvestment: null,
    status: 'active'
  });

  useEffect(() => {
    getStartUpOpportunities();
  }, []);

  // Extract all unique values for filter options
  const allDomains = [...new Set(startupopportunities.map(opp => opp.domain).filter(Boolean))];
  const allStages = [...new Set(startupopportunities.map(opp => opp.startupstage).filter(Boolean))];
  
  // Filter opportunities based on all criteria
  const filteredOpportunities = startupopportunities.filter(opportunity => {
    // Search term matching (name or description)
    const matchesSearch = searchTerm === '' || 
      opportunity.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Domain filter
    const matchesDomain = filters.domain.length === 0 || 
      filters.domain.includes(opportunity.domain);
    
    // Stage filter
    const matchesStage = filters.startupstage.length === 0 || 
      filters.startupstage.includes(opportunity.startupstage);
    
    // Investment range filter
    const matchesInvestment = (
      (filters.minInvestment === null || opportunity.mininvestment >= filters.minInvestment) &&
      (filters.maxInvestment === null || opportunity.maxinvestment <= filters.maxInvestment)
    );
    
    // Status filter
    const matchesStatus = opportunity.status === filters.status;

    return matchesSearch && matchesDomain && matchesStage && matchesInvestment && matchesStatus;
  });

  // Calculate statistics for display
  const totalInvestment = filteredOpportunities.reduce(
    (sum, opp) => sum + (opp.maxinvestment || 0), 0
  );

  const filterMenu = (
    <div className="p-4 bg-white rounded-lg shadow-lg" style={{ width: 300 }}>
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Domain</h4>
        <Select
          mode="multiple"
          placeholder="Select domains"
          style={{ width: '100%' }}
          value={filters.domain}
          onChange={(values) => setFilters({...filters, domain: values})}
          options={allDomains.map(domain => ({ value: domain, label: domain }))}
        />
      </div>
      
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Startup Stage</h4>
        <Select
          mode="multiple"
          placeholder="Select stages"
          style={{ width: '100%' }}
          value={filters.startupstage}
          onChange={(values) => setFilters({...filters, startupstage: values})}
          options={allStages.map(stage => ({ value: stage, label: stage }))}
        />
      </div>
      
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Investment Range</h4>
        <div className="flex space-x-2">
          <Input
            placeholder="Min ($)"
            type="number"
            value={filters.minInvestment}
            onChange={(e) => setFilters({
              ...filters, 
              minInvestment: e.target.value ? Number(e.target.value) : null
            })}
          />
          <Input
            placeholder="Max ($)"
            type="number"
            value={filters.maxInvestment}
            onChange={(e) => setFilters({
              ...filters, 
              maxInvestment: e.target.value ? Number(e.target.value) : null
            })}
          />
        </div>
      </div>
      
      <div className="mb-2">
        <h4 className="font-semibold mb-2">Status</h4>
        <Select
          style={{ width: '100%' }}
          value={filters.status}
          onChange={(value) => setFilters({...filters, status: value})}
          options={[
            { value: 'active', label: 'Active' },
            { value: 'closed', label: 'Closed' },
            { value: 'upcoming', label: 'Upcoming' }
          ]}
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">
          Find Your Next Pitch{' '}
          <span className="text-blue-500">Opportunity</span>
        </h1>
        <p className="text-lg text-gray-500 font-normal">
          Connect with investors and accelerators looking for promising startups
          like yours
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 my-5">
        <Input
          placeholder="Search by name or description..."
          prefix={<SearchOutlined className="text-gray-500 px-1 pe-1.5" />}
          allowClear
          className="flex-1 min-w-md rounded-lg h-10 bg-gray-100"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <Dropdown 
          overlay={filterMenu} 
          trigger={['click']}
          placement="bottomRight"
        >
          <Button
            icon={<FilterOutlined className="text-gray-700" />}
            className="flex-0 rounded-full h-10 bg-white border-gray-300 font-medium"
            size="large"
          >
            Filters
          </Button>
        </Dropdown>
      </div>

      {/* Active filters display */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filters.domain.map(domain => (
          <Tag 
            closable 
            onClose={() => setFilters({
              ...filters,
              domain: filters.domain.filter(d => d !== domain)
            })}
            key={`domain-${domain}`}
          >
            Domain: {domain}
          </Tag>
        ))}
        
        {filters.startupstage.map(stage => (
          <Tag 
            closable 
            onClose={() => setFilters({
              ...filters,
              startupstage: filters.startupstage.filter(s => s !== stage)
            })}
            key={`stage-${stage}`}
          >
            Stage: {stage}
          </Tag>
        ))}
        
        {filters.minInvestment && (
          <Tag
            closable
            onClose={() => setFilters({...filters, minInvestment: null})}
          >
            Min: ${filters.minInvestment.toLocaleString()}
          </Tag>
        )}
        
        {filters.maxInvestment && (
          <Tag
            closable
            onClose={() => setFilters({...filters, maxInvestment: null})}
          >
            Max: ${filters.maxInvestment.toLocaleString()}
          </Tag>
        )}
        
        <Tag
          closable={filters.status !== 'active'}
          onClose={() => setFilters({...filters, status: 'active'})}
        >
          Status: {filters.status.charAt(0).toUpperCase() + filters.status.slice(1)}
        </Tag>
      </div>

      <div className="flex gap-x-6 items-center text-gray-600 break-words flex-wrap">
        <p className="text-lg">
          <span className="text-blue-500 text-xl font-bold">
            {filteredOpportunities.length}
          </span> Active Opportunities
        </p>
        <p className="text-lg">
          <span className="text-blue-500 text-xl font-bold">
            ${(totalInvestment / 1000).toFixed(0)}K+
          </span> Total Investment
        </p>
        <p className="text-lg">
          <span className="text-blue-500 text-xl font-bold">1000+ </span>
          Startups Funded
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <Spin size="large" />
          </div>
        ) : filteredOpportunities.length === 0 ? (
          <div className="col-span-2 text-center py-10">
            <p className="text-gray-500 text-lg">No opportunities match your search criteria</p>
            <Button 
              type="link" 
              onClick={() => {
                setSearchTerm('');
                setFilters({
                  domain: [],
                  startupstage: [],
                  minInvestment: null,
                  maxInvestment: null,
                  status: 'active'
                });
              }}
            >
              Clear all filters
            </Button>
          </div>
        ) : (
          filteredOpportunities.map((data) => (
            <OppStartupCard data={data} key={data.id} />
          ))
        )}
      </div>
    </>
  );
};

export default StartupOpportunities;