import { Modal, message } from 'antd';

export default function DeleteTestModal({ testId, onDeleteTestDone, onHideModal }){
  const handleOk = () => {
    onHideModal();
    axios.delete(`/test/${testId}`)
        .then((res)=>{
            if(res.data.error_code) {
                message.error('Delete test fails');
                console.log(res.data);
                return;
            }
            onDeleteTestDone();
        }).catch((err)=>{
            message.error('Delete test fails');
            console.log(err);
        })
  };

  return (
    <>
      <Modal
      title="Are you sure delete this test?" icon={ <i className="fa fa-file-movie-o" /> }
      okText='Yes' okType='danger' cancelText='Cancel'
      visible={true}
      onOk={handleOk} onCancel={onHideModal}>
        <p>Click yes to confirm delete this test</p>
      </Modal>
    </>
  );
};