/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useGlobalStates } from '../../shared/context/global.states.context';
import { Block, Image, Row } from '../../shared/typography/base';
import Card from '../../components/card/card';
import { vs, vspx } from '../../shared/typography/viewsize';
import { useModal } from '../../shared/hooks/useModal';
import Popup from '../../shared/typography/popup';
import PopupForm from '../../components/popup-form/popup.form';
import Button from '../../shared/controls/button';
import { color } from '../../shared/typography/color';
import Add from '../../assets/icons/add.png';

const HomePage = ({ data, onData, deleteData }) => {
  const { onShowModal, onCloseModal, showModal } = useModal();
  //const [data, setData] = useState([]);
  // const { showPopup, onShowPopup, onClosePopup } = usePopup();

  // const { ws } = useGlobalStates();
  // console.log('wsHOME: ', ws);

  // const message = {
  //   type: 'selectAll',
  //   data: {
  //     tableName: 'projects',
  //   },
  // };

  // ws.onopen = () => {
  //   ws.send(JSON.stringify(message));
  // };

  // // Listen for messages after the connection is open
  // ws.onmessage = (event) => {
  //   const message = JSON.parse(event.data);

  //   if (message.type === 'databaseSelectAllChanged' && message.tableName === 'projects') {
  //     setData(message.value);
  //   }
  // };

  // const onData = (info) => {
  //   // console.log('info: ', info);
  //   const insertMessage = {
  //     type: 'insert',
  //     data: {
  //       tableName: 'projects',
  //       placeholders: ['name', 'orgname'],
  //       values: [info.name, info.orgname],
  //     },
  //   };

  //   const updateMessage = {
  //     type: 'update',
  //     data: {
  //       tableName: 'projects',
  //       placeholders: ['name', 'orgname'],
  //       values: [info.name, info.orgname],
  //       where: `id = ${info.id}`,
  //     },
  //   };

  //   info.id ? ws.send(JSON.stringify(updateMessage)) : ws.send(JSON.stringify(insertMessage));
  // };

  // useEffect(() => {});

  // console.log('data', data);

  return (
    <>
      {showModal && (
        <Popup
          close={onCloseModal}
          opened={showModal}
          top='50%'
          left='50%'
          transform='translate(-50%, -50%)'
          width='50%'
          height='60%'
        >
          <PopupForm onCloseModal={onCloseModal} onData={onData} />
        </Popup>
      )}
      <Row padding={vspx(10)} flexWrap='wrap' alignItems='center' justifyContent='center' gap='8px'>
        {data.map((item) => (
          <Block key={item.id}>
            <Card
              marginTop={vs(20)}
              marginLeft={vs(20)}
              width={vspx(240)}
              height={vspx(360)}
              // width='11.25rem'
              // height='16.25rem'
              data={item}
              onData={onData}
              deleteData={deleteData}
            />
          </Block>
        ))}
      </Row>
      <Button
        type='button'
        width={vspx(80)}
        height={vspx(40)}
        boxShadow={`0 4px 8px 0 ${color('primaryDark')}`}
        display='flex'
        alignItems='center'
        justifyContent='center'
        onClick={onShowModal}
      >
        <Image src={Add} alt='trash' width='40%' />
      </Button>
    </>
  );
};

export default HomePage;
