import { Modal, message } from 'antd';

export default function AddCourseTeacherModal( { courseId, onAddMemberDone, onHileModal }) {

    const onSubmit = (event) => {
        event.preventDefault();
        let data = event.target.elements;
        var login_name = data.login_name.value;
        axios.post(`course/${courseId}/add-teacher/${login_name}`)
        .then((res)=>{
            if(res.data.error_code){
                message.error(res.data.msg);
                return;
            }
            onHileModal();
            onAddMemberDone(res.data.student);
        })
        .catch((err)=>{
            message.error('Request error: view detail in console');
            console.log(err);
        })
    };

    return (
        <Modal
            title={<span><i className="fa fa-group color-primary">Add teacher to course</i></span>}
            visible={true}
            footer={null}
            onCancel={onHileModal}
            zIndex={5}>
            <form onSubmit={onSubmit}>
                <label htmlFor="login_name" className="form-label">Input login name</label>
                <div className="d-flex flex-row">
                    <input className="form-control rounded-0" id="login_name" type="text" name="login_name" required />
                    <button className="btn btn-primary rounded-0 ms-3" type="submit">Add</button>
                </div>
            </form>
        </Modal>
    );
};