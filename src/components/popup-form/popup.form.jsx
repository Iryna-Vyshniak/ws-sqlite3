import React, { useEffect, useState } from 'react';
import { Label, Row } from '../../shared/typography/base';
import Button from '../../shared/controls/button';
import { color } from '../../shared/typography/color';
import { vspx } from '../../shared/typography/viewsize';
import Input from '../../shared/controls/input';
import Form from '../../shared/controls/form';
import { useGlobalStates } from '../../shared/context/global.states.context';

// eslint-disable-next-line react/prop-types
const PopupForm = ({ data, onCloseModal, onData }) => {
  const [dataForm, setDataForm] = useState(
    data
      ? data
      : { name: '', orgname: '', slogan: '', datacreate: new Date().toISOString().split('T')[0] }
  );
  //const { ws } = useGlobalStates();
  // console.log('ws: ', ws);

  useEffect(() => {
    data
      ? setDataForm({ ...data })
      : setDataForm({
          name: '',
          orgname: '',
          slogan: '',
          datacreate: new Date().toISOString().split('T')[0],
        });
  }, [data]);

  // console.log('dataForm: ', dataForm);

  const { name, orgname, slogan, datacreate } = dataForm;

  const handleChange = ({ target }) => {
    const { value, name: inputName, checked, type } = target;

    const newValue = type === 'checkbox' ? checked : value;

    return setDataForm((prev) => ({
      ...prev,
      [inputName]: newValue,
    }));
  };

  const handleSubmit = () => {
    onData(dataForm);
    // ws.send({ type: 'selectAll', data: { tablename: 'projects' } });
    onCloseModal();
  };

  return (
    <Row
      position='relative'
      display='flex'
      justifyContent='center'
      alignItems='center'
      borderRadius={vspx(5)}
      height='100%'
      width='100%'
      padding={vspx(10)}
      boxShadow={`0 4px 8px 0 ${color('background')}`}
    >
      <Form
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        gap={vspx(20)}
        width='80%'
        onSubmit={handleSubmit}
      >
        <Label htmlFor='name' color={color('primaryText')} text='Name' />
        <Input
          type='text'
          id='name'
          name='name'
          placeholder='Enter Name'
          value={name || ''}
          required='required'
          onChange={handleChange}
          style={{
            padding: vspx(8),
            width: '100%',
            color: color('text'),
            boxShadow: `0 4px 8px 0 ${color('primaryDark')}`,
            border: vspx(1) + ` solid ${color('primaryDark')}`,
            background: 'transparent',
          }}
        />

        <Label htmlFor='orgname' color={color('primaryText')} text='Organization' />
        <Input
          type='text'
          id='orgname'
          name='orgname'
          placeholder='Enter Organization'
          value={orgname || ''}
          required='required'
          onChange={handleChange}
          style={{
            padding: vspx(8),
            width: '100%',
            color: color('text'),
            boxShadow: `0 4px 8px 0 ${color('primaryDark')}`,
            border: vspx(1) + ` solid ${color('primaryDark')}`,
            outline: 'none',
            background: 'transparent',
          }}
        />
        <Label htmlFor='slogan' color={color('primaryText')} text='Slogan' />
        <textarea
          type='text'
          id='slogan'
          name='slogan'
          placeholder='Enter Slogan of organization'
          value={slogan}
          required='required'
          onChange={handleChange}
          style={{
            padding: vspx(8),
            width: '100%',
            color: color('text'),
            boxShadow: `0 4px 8px 0 ${color('primaryDark')}`,
            border: vspx(1) + ` solid ${color('primaryDark')}`,
            outline: 'none',
            background: 'transparent',
            resize: 'none',
            height: vspx(200),
            overflow: 'auto',
          }}
        />
        <Label htmlFor='datacreate' color={color('primaryText')} text='Date of created' />
        <Input
          type='text'
          id='datacreate'
          name='datacreate'
          placeholder=''
          value={datacreate}
          required='required'
          onChange={handleChange}
          disabled
          style={{
            padding: vspx(8),
            width: '100%',
            color: color('text'),
            boxShadow: `0 4px 8px 0 ${color('primaryDark')}`,
            border: vspx(1) + ` solid ${color('primaryDark')}`,
            outline: 'none',
            background: 'transparent',
          }}
        />

        <Row justifyContent='center' gap='.5rem'>
          <Button
            type='submit'
            text='Ok'
            width={vspx(150)}
            height={vspx(40)}
            boxShadow={`0 4px 8px 0 ${color('primaryDark')}`}
          />
          <Button
            type='reset'
            text='Cancel'
            onClick={() => onCloseModal()}
            width={vspx(150)}
            height={vspx(40)}
            boxShadow={`0 4px 8px 0 ${color('primaryDark')}`}
          />
        </Row>
      </Form>
    </Row>
  );
};

export default PopupForm;
