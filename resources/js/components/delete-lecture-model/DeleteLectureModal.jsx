import { Modal, message } from 'antd';

export default function DeleteLectureModal({ lectureId, onDeleteLectureDone, onHideModal }){
  const handleOk = () => {
    axios.delete(`/lecture/${lectureId}`)
        .then((res)=>{
            if(res.data.error_code) {
                message.error('Delete lecture fails');
                console.log(res.data);
                return;
            }
            onDeleteLectureDone();
            onHideModal();
        }).catch((err)=>{
            message.error('Delete lecture fails');
            console.log(err);
        })
  };

  return (
    <>
      <Modal
      title="Are you sure delete this lecture?" icon={ <i className="fa fa-file-movie-o" /> }
      okText='Yes' okType='danger' cancelText='Cancel'
      visible={true}
      onOk={handleOk} onCancel={onHideModal}>
        <p>Click yes to confirm delete this lecture</p>
      </Modal>
    </>
  );
};