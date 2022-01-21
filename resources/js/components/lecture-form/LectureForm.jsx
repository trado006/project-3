import { useRef, useEffect } from 'react';
import { message } from 'antd';

export default function LectureForm({ lectureInit, submitBtnValue, onSubmitLecture }){
    var choosedUrl = null;
    const lectureVideoIframeRef = useRef();
    const nameInputRef = useRef();
    const videoInputRef = useRef();
    const descriptionTextareaRef = useRef();

    useEffect(()=>{
        init();
    }, [lectureInit]);

    const init = () => {
        if(!lectureInit) return;
        lectureVideoIframeRef.current.setAttribute('src',lectureInit.video_url);
        choosedUrl = lectureInit.video_url;
        nameInputRef.current.value = lectureInit.name;
        videoInputRef.current.value = lectureInit.video_url;
        descriptionTextareaRef.current.value = lectureInit.description;
    }

    const onSubmit = (event) => {
        event.preventDefault();
        let data = event.target.elements;
        if(!choosedUrl){
            message.error('video url is required');
            return false;
        }
        let request = {
            name: data.name.value,
            description: data.description.value,
            video_url: data.video.value,
        }
        onSubmitLecture(request);
    }

    const changeUrl = (event) => {
        let input = event.target;
        choosedUrl = input.value;
    }

    const checkVideo = () => {
        if(!choosedUrl){
            lectureVideoIframeRef.current.removeAttribute('src');
            message.error('video link empty');
            return false;
        }
        lectureVideoIframeRef.current.setAttribute('src', choosedUrl);
    }

    return (
        <form className="row" onSubmit={onSubmit}>
            <div className="col-12">
                <input ref={nameInputRef} name="name" type="text" className="form-control rounded-0" placeholder="Input lecture name" required />
                <div className="border bg-info my-3">
                    <iframe className="w-100" ref={lectureVideoIframeRef} src="" frameBorder="1" allowFullScreen style={{minHeight: '300px'}} ></iframe>
                </div>
                <div className="d-flex flex-row">
                    <input ref={videoInputRef} type="text" className="form-control flex-grow-1 me-2 rounded-0"
                        placeholder="https://www.youtube.com/embed/Hc0EcBkSwnk" name="video" onChange={changeUrl} required />
                    <input type="button" className="btn btn-primary rounded-0" defaultValue="Test video" onClick={checkVideo} />
                </div>
            </div>
            <div className="col-12">
                <div className="mb-4">
                    <label className="form-label" htmlFor="lecture-description">Description</label>
                    <textarea ref={descriptionTextareaRef} id="lecture-description" name="description" className="form-control" rows="3" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">{submitBtnValue || 'Submit'}</button>
            </div>
        </form>
    );
};