import { Card } from "antd"
const { Meta } = Card

export default function App({ className, style, imgSrc, imgAlt, course, viewCourse }) {

    const onClick = () => {
        viewCourse(course);
    }

    return (
        <Card
            hoverable
            bordered
            style={{width: '240px'}}
            cover={<img className="border" style={{objectFit: 'cover', height: '240px'}} alt={imgAlt} src={imgSrc} />}
            onClick={onClick}
        >
            <Meta title="Name:" description={course.name} />
            <Meta title="Code:" description={course.code} />
            <Meta title="Price:" description={course.price} />
        </Card>
    )
}