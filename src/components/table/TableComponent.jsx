import React from 'react';
import PropTypes from 'prop-types';

function TableComponent({ columns, data }) {
  return (
    <table className="table table-bordered table-striped table-hover ">
      <thead className="table-dark">
        <tr>
          {columns.map((column, index) => (
            <th key={index} scope="col">{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>{row[column.accessor]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

TableComponent.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableComponent;
