import { Modal } from 'antd';

export default function App( {position, addMember, setIsModalVisible} ) {

  const onSubmit = (event) => {
    event.preventDefault();
    let data = event.target.elements;
    addMember(data.login_name.value);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        title={`Add ${position} to course`}
        visible={true}
        footer={null}
        onCancel={handleCancel}
        zIndex={5}>
        <form onSubmit={onSubmit}>
            <label htmlFor="login_name" className="form-label">Input login name of {position}</label>
            <div className="d-flex flex-row">
                <input className="form-control" id="login_name" type="text" name="login_name" required />
                <button className="btn btn-primary text-uppercase ms-3" type="submit">Add</button>
            </div>
        </form>
      </Modal>
    </>
  );
};