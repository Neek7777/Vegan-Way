import React from 'react';
import 'antd/dist/antd.css';
import { DatePicker, Button } from 'antd';

function App(props) {
  return (
    <>
    <h1>Vegan Way version 1</h1>
    <DatePicker />
    <Button type="primary" style={{ marginLeft: 8 }}>
      Primary Button
    </Button>
    </>
  );
}
export default App;
