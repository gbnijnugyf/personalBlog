import { useState } from 'react';
import { Button, Modal } from 'antd';

export interface IDialogProps{
    text:string,
    buttonText:string
}


export function Dialog(props:IDialogProps){
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {props.buttonText}
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>{props.text}</p>
      </Modal>
    </>
  );
};