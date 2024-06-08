import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import './style.css';
import { Button } from '@mui/material';

interface TableProps {
  records: Record<string, any>[];
  viewRecord: (record: Record<string, any>) => void;
  editRecord: (record: Record<string, any>) => void;
  deleteRecord: (id: number) => void;
}

const Table: React.FC<TableProps> = ({ viewRecord, editRecord, deleteRecord }) => {
  const { state } = useContext(AppContext);

  return (
    <table className="table-wrapper">
      <thead>
        <tr>
          <th>Title</th>
          <th>Upvotes</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {state.records.map((record) => (
          <tr key={record.id}>
            <td>{record.title}</td>
            <td>{record.upvotes}</td>
            <td>{record.date}</td>
            <td className="actions">
              <div className="actions-wrapper">
                <Button 
                  variant="contained" 
                  size="small" 
                  color="success"
                  className="custom-button"
                  onClick={() => viewRecord(record)}
                >
                  View
                </Button>

                <Button 
                  variant="contained" 
                  size="small" 
                  className="custom-button"
                  onClick={() => editRecord(record)}
                >
                  Edit
                </Button>

                <Button 
                  variant="contained" 
                  size="small" 
                  color="error"
                  className="custom-button"
                  onClick={() => deleteRecord(record.id)}
                >
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
