import React, { useEffect, useContext } from 'react';
import Form from './components/Form';

import SearchBar from './components/SearchBar';
import { AppContext, AppProvider } from './context/AppContext';
import { addItem, getItems, updateItem, deleteItem } from './utils/db';
import { Button, Card, CardContent, Container, Grid, Typography, Stack } from '@mui/material';
import Table from './components/Table/Table';

const App: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      const items = await getItems();
      dispatch({ type: 'SET_RECORDS', payload: items });
    };
    fetchData();
  }, [dispatch]);

  const addRecord = async (record: Record<string, any>) => {
    await addItem(record);
    const items = await getItems();
    dispatch({ type: 'SET_RECORDS', payload: items });
  };

  const saveEdits = async (record: Record<string, any>) => {
    if (state.editingRecord) {
      await updateItem({ ...record, id: state.editingRecord.id });
      const items = await getItems();
      dispatch({ type: 'SET_RECORDS', payload: items });
      dispatch({ type: 'SET_EDITING_RECORD', payload: undefined });
    }
  };

  const deleteRecord = async (id: number) => {
    await deleteItem(id);
    const items = await getItems();
    dispatch({ type: 'SET_RECORDS', payload: items });
  };

  const handleSearch = (query: string) => {
    if (query.length >= 3) {
      const results = state.records.filter((record) =>
        record.title.toLowerCase().includes(query.toLowerCase())
      );
      dispatch({ type: 'SET_RECORDS', payload: results });
    } else {
      dispatch({ type: 'SET_RECORDS', payload: state.records });
    }
  };

  const sortRecords = (key: 'upvotes' | 'date') => {
    const sortedRecords = [...state.records].sort((a, b) =>
      key === 'upvotes'
        ? b.upvotes - a.upvotes
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    dispatch({ type: 'SET_RECORDS', payload: sortedRecords });
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={4}>
        <Card sx={{ padding: '16px', marginTop: '160px' }}>
          <CardContent>
            <Typography variant="h5" sx={{marginBottom: '16px'}}>
              {state.editingRecord ? 'Edit Record' : 'Add Record'}
            </Typography>
            
            <Form 
              addRecord={addRecord}
              editRecord={state.editingRecord} 
              saveEdits={saveEdits} 
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={8}>
        <SearchBar onSearch={handleSearch} />

        <Stack 
          spacing={{ xs: 2 }} 
          sx={{margin: '20px 0'}}
          direction="row" 
          alignItems="center" 
          useFlexGap 
          flexWrap="wrap"
          justifyContent="center"
        >
          <Typography>Sort By</Typography>
          <Button variant="contained" onClick={() => sortRecords('upvotes')}>Most Upvoted</Button>
          <Button variant="contained" onClick={() => sortRecords('date')}>Most Recent</Button>
        </Stack>

        <Card sx={{ paddingBottom: '0'}}>
          <CardContent sx={{ padding: '0'}}>
            <Table
              records={state.records}
              viewRecord={(record) => alert(JSON.stringify(record, null, 2))}
              editRecord={(record) => dispatch({ type: 'SET_EDITING_RECORD', payload: record })}
              deleteRecord={(id) => {
                if (window.confirm('Are you sure you want to delete this record?')) {
                  deleteRecord(id);
                }
              }}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

const AppWrapper: React.FC = () => (
  <AppProvider>
    <Container maxWidth="xl">
      <App />
    </Container>
  </AppProvider>
);

export default AppWrapper;
