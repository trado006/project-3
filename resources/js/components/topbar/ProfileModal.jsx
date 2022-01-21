import { Modal, message } from 'antd';
import API from '../../util/api';

export default function App({ avatar, setAvatar, setIsModalVisible }){
    var choosedFile = null;
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        let data = event.target.elements;
        const formData = new FormData();
        if(!choosedFile){
            message.error('Please select image first');
            return false;
        }
        formData.append('image', choosedFile, choosedFile.name);
        API.post('/upload-avatar',formData)
        .then((res)=>{
            console.log(res.data);
            if(res.data.error_code){
                message.error('Update avatar fails');
                console.log(res.data);
                return;
            }
            setAvatar(res.data.avatar);
            message.success("Update avatar successfully");
            setIsModalVisible(false);
        }).catch((err)=>{
            message.error('View detai error in console');
            console.log(err);
        })
    }

    const changeFile = (event) => {
        let input = event.target;
        if (input.files && input.files[0]) {
            choosedFile = input.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                document.getElementById('imageView').setAttribute('src',`${e.target.result}`);
            }
            reader.readAsDataURL(input.files[0]);
        }else{
            choosedFile = null;
            document.getElementById('imageView').removeAttribute('src');
        }
    }

    const onClickFileUpload = () => {
        document.getElementById('fileInput').click();
    }

  return (
    <>
        <Modal
            title={<span>User Info</span>}
            onCancel={handleCancel}
            footer={null}
            visible={true}
            zIndex={5}
            width={600}
        >
            <form className="row" onSubmit={onSubmit}>
                <div className="col-12">
                    <div className="border rounded p-1 bg-info mb-3">
                        <img className="w-100" id="imageView" src={avatar? avatar:''} style={{minHeight:'400px'}} />
                    </div>
                    <input id="fileInput" type="file" accept=".gif,.jpg,.jpeg,.png" style={{display:'none'}} onChange={changeFile} />
                </div>
                <div className="col-12 d-flex flex-row justify-content-between">
                    <input type="button" className="btn btn-primary" defaultValue="SELECT AVATAR" onClick={onClickFileUpload} />
                    <button type="submit" className="btn btn-primary text-uppercase">Update Image</button>
                </div>
            </form>
        </Modal>
    </>
  );
};