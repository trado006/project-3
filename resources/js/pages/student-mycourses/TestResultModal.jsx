import { Modal, message } from 'antd';

export default function TestResultModal( { testResult, onHideModal }) {
    return (
        <Modal
            title={<span>Notice your score</span>}
            visible={true}
            footer={null}
            onCancel={onHideModal}
            zIndex={5}>
            <p>Score of you is {testResult.score} / {testResult.total}</p>
        </Modal>
    );
};