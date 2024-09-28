import React from 'react';


const PackageOverview = () => {
  const packages = [
    // Sample data
    {
      id: 1,
      petImage: 'url_to_image',
      packageName: 'Basic Care',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'Đang hoạt động', 
    },
    
  ];

//   const renderStatusBadge = (status) => {
//     switch (status) {
//       case 'active':
//         return <Badge bg="success">Active</Badge>;
//       case 'expiring':
//         return <Badge bg="warning">Expiring Soon</Badge>;
//       case 'expired':
//         return <Badge bg="secondary">Expired</Badge>;
//       default:
//         return null;
//     }
//   };

  return (
   <div className="container mt-4">
  <div className="d-flex justify-content-between align-items-center mb-4">
    <h2 className="text-orange">Purchased Packages</h2>
    <button className="btn btn-outline-warning">Buy New Package</button>
  </div>

  <div className="mb-3">
    <select className="form-select w-auto">
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="expiring">Expiring Soon</option>
      <option value="expired">Expired</option>
    </select>
  </div>

  {/* <div className="row row-cols-1 gy-3">
    <div className="col">
      <div className="card flex-row align-items-center">
        <img src="url_to_image" alt="Pet" className="img-thumbnail" style={{height: 100, width: 100}}/>
        <div className="card-body">
          <h5 className="card-title">Basic Care</h5>
          <p className="card-text"><strong>Start Date:</strong> 2024-01-01</p>
          <p className="card-text"><strong>End Date:</strong> 2024-12-31</p>
          <span className="badge bg-success">Active</span>
        </div>
        <div className="ms-auto p-3">
          <button className="btn btn-outline-primary btn-sm">View Details</button>
        </div>
      </div>
    </div>
  </div> */}
  <div className="card custom-card">
  <div className="card-body d-flex align-items-center">
    <div className="time-info">
      <div className="time">12:00 PM</div>
      <div className="date">April, 08</div>
    </div>
    <div className="divider"></div>
    <div className="content">
      <h5 className="card-title">Headline</h5>
      <p className="card-text">Please add your content here. Keep it short and simple. And smile :)</p>
    </div>
  </div>
</div>
</div>

  );
};

export default PackageOverview;
