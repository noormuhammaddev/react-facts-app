import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Box, Button, Card, CardContent, TextField } from '@mui/material';

interface FormProps {
  addRecord: (record: Record<string, any>) => void;
  editRecord?: Record<string, any>;
  saveEdits?: (record: Record<string, any>) => void;
}

const Form: React.FC<FormProps> = ({ addRecord, editRecord, saveEdits }) => {
  const [title, setTitle] = useState(editRecord?.title || '');
  const [upvotes, setUpvotes] = useState(editRecord?.upvotes || '');
  const [date, setDate] = useState(editRecord?.date || '');
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    if (editRecord) {
      setTitle(editRecord.title);
      setUpvotes(editRecord.upvotes);
      setDate(editRecord.date);
    }
  }, [editRecord]);

  const isFormValid = () => {
    return title && upvotes && date;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const record = { title, upvotes: Number(upvotes), date };
    if (editRecord) {
      saveEdits!(record);
    } else {
      addRecord(record);
    }
    setTitle('');
    setUpvotes('');
    setDate('');
    dispatch({ type: 'SET_EDITING_RECORD', payload: undefined });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ marginBottom: '20px' }}>
        <TextField 
          label="Title" 
          value={title} 
          variant="outlined" 
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
        />
      </Box>
      <Box sx={{ marginBottom: '20px' }}>
        <TextField 
          label="Up Votes" 
          type="number"
          value={upvotes} 
          variant="outlined" 
          onChange={(e) => setUpvotes(e.target.value)}
          required
          fullWidth
        />
      </Box>

      <Box sx={{ marginBottom: '20px' }}>
        <TextField 
          
          type="date"
          value={date} 
          variant="outlined" 
          onChange={(e) => setDate(e.target.value)}
          required
          fullWidth
        />
      </Box>

      <Button 
        type="submit" 
        variant="contained" 
        color="success" 
        size="large"
        fullWidth
        disabled={!isFormValid()}
      >
        {editRecord ? 'Update' : 'Add Data'}
      </Button>
    </form>
  );
};

export default Form;
