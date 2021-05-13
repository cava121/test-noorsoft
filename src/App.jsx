import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import {
  fetchRecords,
  deleteRecordAPI,
  addRecordAPI,
  changeRecordAPI,
} from './store/actions/record';

const App = () => {
  const { records, loading } = useSelector((state) => state.recordsPage);
  const [change, setChange] = useState(false);
  const [newRecord, setNewRecord] = useState(false);
  const newRecordName = useRef('');
  const newRecordAge = useRef('');

  const addNewRecord = () => {
    dispatch(
      addRecordAPI({
        name: newRecordName.current.value,
        age: newRecordAge.current.value,
      })
    );
    newRecordName.current.value = '';
    newRecordAge.current.value = '';
    setNewRecord(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRecords());
  }, []);

  const deleteRecord = (id) => {
    dispatch(deleteRecordAPI(id));
  };

  const changeRecord = (data) => {
    debugger;
    dispatch(changeRecordAPI(data));
  };

  return (
    <div>
      {loading ? (
        <h1>Идет загрузка...</h1>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Возраст</th>
              <th>Редактировать</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {records &&
              records.map((record) => {
                let isReadOnly = true;
                let name = record.data.name;
                let age = record.data.age;

                {
                  if (change._id === record._id) {
                    isReadOnly = false;
                    name = change.name;
                    age = change.age;
                  } else {
                    isReadOnly = true;
                  }
                }
                return (
                  <tr key={record._id}>
                    <th>
                      <input
                        onChange={(e) => {
                          setChange({ ...change, name: e.target.value });
                        }}
                        readOnly={isReadOnly}
                        value={name}
                      />
                    </th>
                    <th>
                      <input
                        onChange={(e) => {
                          setChange({ ...change, age: e.target.value });
                        }}
                        readOnly={isReadOnly}
                        value={age}
                      />
                    </th>
                    <th>
                      {change._id === record._id ? (
                        <SaveOutlined
                          onClick={() => changeRecord(record._id, change)}
                          style={{ cursor: 'pointer' }}
                        />
                      ) : (
                        <EditOutlined
                          style={{ cursor: 'pointer' }}
                          onClick={() =>
                            setChange({
                              _id: record._id,
                              name: record.data.name,
                              age: record.data.age,
                            })
                          }
                        />
                      )}
                    </th>
                    <td style={{ textAlign: 'center' }}>
                      <DeleteOutlined
                        style={{ cursor: 'pointer' }}
                        onClick={() => deleteRecord(record._id)}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
      <button onClick={() => setNewRecord(true)}>
        Добавить запись <FileAddOutlined />
      </button>
      {newRecord && (
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Возраст</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <input
                  type="text"
                  ref={newRecordName}
                  placeholder="Введите имя"
                />
              </th>
              <th>
                <input
                  type="text"
                  ref={newRecordAge}
                  placeholder="Введите возраст"
                />
              </th>
              <th>
                <FileAddOutlined onClick={addNewRecord} />
              </th>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
