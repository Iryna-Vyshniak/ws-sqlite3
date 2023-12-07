/* eslint-disable react/prop-types */
import Article from '../../shared/typography/article';
import { Column, Image, Item, Row, Text } from '../../shared/typography/base';
import { color } from '../../shared/typography/color';
import { vs, vspx } from '../../shared/typography/viewsize';
import Earth from '../../assets/images/earth.png';
import Popup from '../../shared/typography/popup';
import PopupForm from '../popup-form/popup.form';
import { useModal } from '../../shared/hooks/useModal';

function Card({ data: { id, name, orgname, slogan, datacreate }, onData, ...props }) {
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
          <Text
            display='flex'
            marginTop={vspx(8)}
            text={datacreate}
            color={color('primaryText')}
            fontSize='60%'
          />
        }
        onClick={onShowModal}
      >
        <Column height='100%' width='100%' padding={vspx(10)}>
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
