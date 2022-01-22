import { useState, useEffect } from 'react';
import { Modal, message } from 'antd';

export default function App({ courseId, updateCourse, setIsModalVisible }){
    var choosedFile = null;
    const [ course, setCourse ] = useState();
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(()=>{
        axios.get(`/course/${courseId}`)
        .then(function (res) {
            if(res.data.error_code){
                console.log(res.data);
                message.error("Request error: view detail in console");
                return;
            }
            setCourse(res.data.course);
        })
        .catch((error) => {
            message.error("Request error: view detail in console");
            console.log(error);
        });
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        let data = event.target.elements;
        const formData = new FormData();
        if(choosedFile){
            formData.append('image', choosedFile, choosedFile.name);
        }
        formData.append('code', data.code.value);
        console.log(data.code.value);
        formData.append('name', data.name.value);
        formData.append('price', data.price.value);
        formData.append('description', data.description.value);
        axios.post(`/course/${courseId}`,formData)
        .then((res)=>{
            console.log(res.data);
            if(res.data.error_code){
                message.error('Update course fails');
                console.log(res.data);
                return;
            }
            let course = {
                id: res.data.course.id,
                name: res.data.course.name,
            };
            updateCourse(course);
            message.success("Update course successfully");
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
            title={<span><i className="fa fa-book" /> Update course</span>}
            onCancel={handleCancel}
            footer={null}
            visible={true}
            zIndex={5}
            width={600}
        >
            <form className="row" onSubmit={onSubmit}>
                <div className="col-xl-6 col-lg-6 col-md-12">
                    <div className="form-group mb-3">
                        <label className="form-label" htmlFor="course-code">Code</label>
                        <input type="text" className="form-control validate" id="course-code" name="code" defaultValue={course? course.code:''} required />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label" htmlFor="course-name">Name</label>
                        <input id="course-name" name="name" type="text" className="form-control validate" defaultValue={course? course.name:''} required />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label" htmlFor="course-price">Price</label>
                        <input id="course-price" name="price" type="number" min="1" className="form-control validate" defaultValue={course? course.price:''} required />
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12">
                    <div className="border rounded p-1 bg-info">
                        <img className="w-100" id="imageView" src={course? course.picture:''} style={{minHeight:'200px'}} />
                    </div>
                    <div className="custom-file mt-3 mb-3">
                        <input id="fileInput" type="file" accept=".gif,.jpg,.jpeg,.png" style={{display:'none'}} onChange={changeFile} />
                        <input type="button" className="btn btn-primary w-100" defaultValue="UPLOAD COURSE IMAGE" onClick={onClickFileUpload} />
                    </div>
                </div>
                <div className="col-12">
                    <div className="mb-4">
                        <label className="form-label" htmlFor="course-description">Description</label>
                        <textarea id="course-description" name="description" className="form-control validate" rows="3" defaultValue={course? course.description:''} required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 text-uppercase">Update Course</button>
                </div>
            </form>
        </Modal>
    </>
  );
};