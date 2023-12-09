import { Suspense, lazy, useState } from 'react';
import { setVp } from './shared/typography/viewsize';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/layout';
import { useGlobalStates } from './shared/context/global.states.context';

const HomePage = lazy(() => import('./pages/home-page/home.page'));

function App() {
  const [resize, setResize] = useState(false);

  window.onresize = () => {
    setVp();
    setResize(!resize);
  };

  const [data, setData] = useState([]);

  const { ws } = useGlobalStates();
  console.log('ws: ', ws);

  const message = {
    type: 'selectAll',
    data: {
      tableName: 'projects',
    },
  };

  ws.onopen = () => {
    ws.send(JSON.stringify(message));
  };

  ws.onmessage = (e) => {
    const message = JSON.parse(e.data);
    if (message.type === 'databaseSelectAllChanged' && message.tableName === 'projects') {
      setData(message.value);
    }
  };

  const onData = (info) => {
    console.log('info: ', info);
    const insertMessage = {
      type: 'insert',
      data: {
        tableName: 'projects',
        placeholders: ['name', 'orgname', 'slogan', 'datacreate'],
        values: [info.name, info.orgname, info.slogan, info.datacreate],
      },
    };

    const updateMessage = {
      type: 'update',
      data: {
        tableName: 'projects',
        placeholders: ['name', 'orgname', 'slogan', 'datacreate'],
        values: [info.name, info.orgname, info.slogan, info.datacreate],
        where: `id = ${info.id}`,
      },
    };

    info.id ? ws.send(JSON.stringify(updateMessage)) : ws.send(JSON.stringify(insertMessage));
    ws.send(JSON.stringify(message));
  };

  const deleteData = (info) => {
    console.log('info: ', info);
    const deleteMessage = {
      type: 'delete',
      data: {
        tableName: 'projects',
        where: `id = ${info}`,
      },
    };

    ws.send(JSON.stringify(deleteMessage));
    ws.send(JSON.stringify(message));
  };

  //console.log('data', data);

  return (
    <BrowserRouter>
      <Suspense fallback={<p>...Loading</p>}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route
              index
              element={<HomePage data={data} onData={onData} deleteData={deleteData} />}
            />
            <Route path='*' element={<HomePage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
