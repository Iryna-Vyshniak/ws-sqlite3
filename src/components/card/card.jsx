/* eslint-disable react/prop-types */
import Article from '../../shared/typography/article';
import { Column, Image, Row, Text } from '../../shared/typography/base';
import { color } from '../../shared/typography/color';
import { vs, vspx } from '../../shared/typography/viewsize';
import Popup from '../../shared/typography/popup';
import { useModal } from '../../shared/hooks/useModal';
import Button from '../../shared/controls/button';
import PopupForm from '../popup-form/popup.form';
import Earth from '../../assets/images/earth.png';
import Delete from '../../assets/icons/trash.png';

function Card({ data: { id, name, orgname, slogan, datacreate }, onData, deleteData, ...props }) {
  const { onShowModal, onCloseModal, showModal } = useModal();
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
          <PopupForm
            onCloseModal={onCloseModal}
            data={{ id, name, orgname, slogan, datacreate }}
            onData={onData}
          />
        </Popup>
      )}
      <Article
        {...props}
        backgroundColor={color('background')}
        radius={vs(10)}
        boxShadow={`2px -2px 16px 7px rgba(7,145,0,0.1)`}
        header={
          <Text
            display='flex'
            marginTop={vspx(8)}
            text={slogan}
            color={color('primaryText')}
            fontSize='60%'
          />
        }
        footer={
          <Row gap='1rem' alignItems='center' justifyContent='center'>
            <Text
              display='flex'
              marginTop={vspx(8)}
              text={datacreate}
              color={color('primaryText')}
              fontSize='60%'
            />
            <Button
              type='button'
              width={vspx(60)}
              height={vspx(30)}
              boxShadow={`0 4px 8px 0 ${color('primaryDark')}`}
              display='flex'
              alignItems='center'
              justifyContent='center'
              onClick={() => deleteData(id)}
            >
              <Image src={Delete} alt='trash' width='30%' />
            </Button>
          </Row>
        }
      >
        <Column
          height='100%'
          width='100%'
          padding={vspx(10)}
          cursor='pointer'
          onClick={onShowModal}
        >
          <Row
            height='50%'
            padding='5%'
            alignItems='center'
            justifyContent='space-between'
            borderBottom={`1px solid ` + color('secondary')}
          >
            <Image
              src={Earth}
              alt='logo'
              width='100%'
              height='100%'
              style={{ objectFit: 'contain' }}
            />
            <Text text={orgname} textAlign='center' fontSize='60%' color={color('primaryText')} />
          </Row>
          <Column height='70%' marginTop='5%' rowGap='5%'>
            <Text text={name} textAlign='center' fontSize='60%' color={color('primaryText')} />
          </Column>
        </Column>
      </Article>
    </>
  );
}

export default Card;
