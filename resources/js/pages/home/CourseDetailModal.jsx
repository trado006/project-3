import { Button, Image } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { Modal, message } from 'antd';

import "./coursedetailmodal.css";

export default function App({course, setIsModalVisible }){

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Modal
            title={<span><i className="fa fa-book" /> Course detail</span>}
            onCancel={handleCancel}
            footer={null}
            visible={true}
            zIndex={5}
            width={640}
        >
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
                        {course.description}
                    </p>
                </div>
            </div>

        </Modal>
    )
}

