import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import API from '../../util/api';

export default function App({ courseId, deleteCourse, setIsModalVisible }){
  const handleOk = () => {
    setIsModalVisible(false);
    API.delete(`/course/${courseId}`)
        .then((res)=>{
            if(res.data.error_code) {
                message.error('Delete course fails');
                return;
            }
            deleteCourse();
            message.success('Delete course is okey!');
        }).catch((err)=>{
            console.log(err);
        })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
      title="Are you sure delete this course?" icon={<ExclamationCircleOutlined />}
      okText='Yes' okType='danger' cancelText='Cancel'
      visible={true}
      onOk={handleOk} onCancel={handleCancel}>
        <p>Click yes to confirm delete this course</p>
      </Modal>
    </>
  );
};