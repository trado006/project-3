import { useRef, useEffect } from 'react';
import { Button, Image } from 'antd';
import Meta from 'antd/lib/card/Meta';

import "./coursedetail.css";

export default function App({course}) {
    const lectureDescriptionArea = useRef();
    useEffect(()=>{
        lectureDescriptionArea.current.value = course.description;
        textAreaAdjust(lectureDescriptionArea.current);
    }, [course]);

    const textAreaAdjust = (element) => {
        element.style.height = "1px";
        element.style.height = (element.scrollHeight)+"px";
    }
    
    return (
        <div className='box-courses-introduction'>
            <div className="box-courses-introduction-first">
                <div className="courses-introduction-img">
                    <Image
                        width={200}
                        src={course.picture}
                    />
                </div>
                <div className="courses-introduction-title">
                    <Meta title="Name:" description={course.name} />
                    <Meta title="Code:" description={course.code} />
                    <Meta title="Price:" description={course.price} />
                    <Button className='btn-buy-courses me-3' type="primary" ghost>
                        Review
                    </Button>
                    <Button className='btn-buy-courses' type="primary" ghost>
                        Buy
                    </Button>
                </div>
            </div>
            <div className='box-courses-introduction-second'>
                <h2>Description</h2>
                <p>
                    <textarea ref={lectureDescriptionArea} className="d-block w-100" disabled-custom="true" disabled></textarea>
                </p>
            </div>
        </div>
    );
}