import { useRef } from "react";
import { message } from "antd";

export default function App({ postCourse }) {
    var choosedFile = null;

    const imageViewRef = useRef();
    const fileInputRef = useRef();

    const onSubmit = (event) => {
        event.preventDefault();
        let data = event.target.elements;
        const formData = new FormData();
        if(!choosedFile){
            message.error("Course picture is required");
            return false;
        }
        formData.append('image', choosedFile, choosedFile.name);
        formData.append('code', data.code.value);
        formData.append('name', data.name.value);
        formData.append('price', data.price.value);
        formData.append('description', data.description.value);
        postCourse(formData);
    }

    const changeFile = (event) => {
        let input = event.target;
        if (input.files && input.files[0]) {
            choosedFile = input.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                imageViewRef.current.setAttribute('src',`${e.target.result}`);
                // setImageSource('url(' + e.target.result + ')');
            }
            reader.readAsDataURL(input.files[0]);
        }else{
            choosedFile = null;
            imageViewRef.current.removeAttribute('src');
            // setImageSource('');
        }
    }

    const onClickFileUpload = () => {
        fileInputRef.current.click();
    }
    return (
        <form className="row" onSubmit={onSubmit}>
            <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group mb-3">
                    <label className="form-label" htmlFor="course-code">Code</label>
                    <input id="course-code" name="code" type="text" className="form-control validate" required />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label" htmlFor="course-name">Name</label>
                    <input id="course-name" name="name" type="text" className="form-control validate" required />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label" htmlFor="course-price">Price</label>
                    <input id="course-price" name="price" type="number" min="1" className="form-control validate" required />
                </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="border rounded p-1 bg-info">
                    <img ref={imageViewRef} className="w-100" style={{minHeight:'200px'}} />
                </div>
                <div className="custom-file mt-3 mb-3">
                    <input ref={fileInputRef} type="file" accept=".gif,.jpg,.jpeg,.png" style={{display:'none'}} onChange={changeFile} />
                    <input type="button" className="btn btn-primary w-100" value="UPLOAD COURSE IMAGE" onClick={onClickFileUpload} />
                </div>
            </div>
            <div className="col-12">
                <div className="mb-4">
                    <label className="form-label" htmlFor="course-description">Description</label>
                    <textarea id="course-description" name="description" className="form-control validate" rows="3" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100 text-uppercase">Add Course Now</button>
            </div>
        </form>
    )
}