import { useState, useEffect } from 'react';
import { Modal, message } from 'antd';

import LectureForm from '../lecture-form/LectureForm'

export default function App({ lectureId, onUpdateLectureDone, onCancel }){
    const [ lecture, setLecture ] = useState({
        id: 0,
        name: '',
        video_url: '',
        description: '',
    });

    useEffect(()=>{
        axios.get(`/lecture/${lectureId}`)
        .then(function (res) {
            if(res.data.error_code){
                console.log(res.data);
                message.error("Request error: view detail in console");
                return;
            }
            setLecture(res.data.lecture);
        })
        .catch((error) => {
            message.error("Request error: view detail in console");
            console.log(error);
        });
    }, [lectureId]);

    const putLecture = (requestData) =>{
        axios.put(`lecture/${lectureId}`,requestData)
        .then((res)=>{
            console.log(res.data);
            switch(res.data.error_code){
                case 0:
                    onUpdateLectureDone(res.data.lecture);
                    message.success("Update lecture successfully");
                    onCancel();
                    break;
                case 1:
                    message.error(res.data.error[0][1]);
                    break;
                case 2:
                    message.error('Update lecure fails');
                    console.log(res.data);
                    break;
            }
        }).catch((err)=>{
            message.error('View detai error in console');
            console.log(err);
        })
    }

    return (
        <Modal
            title={<span>Update lecture</span>}
            onCancel={onCancel}
            footer={null}
            visible={true}
            zIndex={5}
            width={600}
        >
            <LectureForm submitBtnValue="Update lecture" lectureInit={lecture}
                onSubmitLecture={putLecture}
            />
            {/* <form className="row" onSubmit={onSubmit}>
                <div className="col-12">
                    <input name="name" type="text" className="form-control rounded-0" placeholder="Input lecture name" defaultValue={lecture.name} required />
                    <div className="border bg-info my-3">
                        <iframe className="w-100" id="videoPreview" src={lecture.video_url} frameBorder="1" allowFullScreen style={{minHeight: '300px'}} ></iframe>
                    </div>
                    <div className="d-flex flex-row">
                        <input type="text" className="form-control flex-grow-1 me-2 rounded-0"
                            placeholder="https://www.youtube.com/embed/Hc0EcBkSwnk" name="video" defaultValue={lecture.video_url} onChange={changeUrl} required />
                        <input type="button" className="btn btn-primary rounded-0" defaultValue="TEST VIDEO" onClick={checkVideo} />
                    </div>
                </div>
                <div className="col-12">
                    <div className="mb-4">
                        <label className="form-label" htmlFor="lecture-description">Description</label>
                        <textarea id="lecture-description" name="description" className="form-control" rows="3" defaultValue={lecture.description} required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 text-uppercase">Update Lecture</button>
                </div>
            </form> */}
        </Modal>
    );
};