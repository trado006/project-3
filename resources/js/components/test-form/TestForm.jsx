import { useState, useEffect } from 'react';
import { Modal, message } from 'antd';

export default function App({ submitBtnValue, testInit, onSubmitTest }){
    
    const onSubmit = (event) => {
        event.preventDefault();
        let data = event.target.elements;
        let request = {
            name: data.name.value,
            description: data.description.value,
        }
        onSubmitTest(request);
    }

  return (
        <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label className="form-label" htmlFor="test-name">Name</label>
                    <input type="text" id="test-name" name="name" className="form-control rounded-0" rows="3"
                        defaultValue={testInit? testInit.name: ''} required />
                </div>
                <div className="mb-4">
                    <label className="form-label" htmlFor="test-description">Description</label>
                    <textarea id="test-description" name="description" className="form-control rounded-0" rows="3"
                        defaultValue={testInit? testInit.description: ''}></textarea>
                </div>
            <button type="submit" className="btn btn-primary w-100">{submitBtnValue || 'Submit'}</button>
        </form>
  );
};