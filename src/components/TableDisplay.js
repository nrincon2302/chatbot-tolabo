import React from 'react';

const TableDisplay = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key} style={styles.tableHeader}>
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td key={idx} style={styles.tableCell}>
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  tableContainer: {
    marginTop: '10px',
    backgroundColor: '#FFFBEA',
    border: '1px solid #C4B998',
    borderRadius: '10px',
    padding: '10px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#C4B998',
    color: '#4F774E',
    fontWeight: 'bold',
    padding: '8px',
    textAlign: 'left',
    borderBottom: '2px solid #C4B998',
  },
  tableCell: {
    padding: '8px',
    textAlign: 'left',
    borderBottom: '1px solid #C4B998',
  },
};

export default TableDisplay;
