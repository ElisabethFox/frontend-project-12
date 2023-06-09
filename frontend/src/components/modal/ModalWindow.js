import { Modal } from "react-bootstrap";
import ModalButtton from "../buttons/modal-button/ModalButtton";
import Form from "react-bootstrap/Form";
import {useFormik} from "formik";
import { useChatApi } from "../../hooks/hooks";
import { useDispatch, useSelector } from "react-redux";
import { closeModalWindow } from "../../slices/modalWindowSlice";


const ModalWindow = () => {
    const { addNewChannel } = useChatApi();
    const isModalWindowOpen = useSelector((state) => state.modalWindow.isOpen);
    const dispatch = useDispatch();
    
    const hundleCloseModalWindow = () => {
        dispatch(closeModalWindow());
    };

    const formik = useFormik({
        initialValues: { name: "" },
        onSubmit: (values) => {
            try {
                const channel = {
                    ...values,
                }
                addNewChannel(channel);
                hundleCloseModalWindow();
            } catch {
                console.log('error');
            }
        },
    });

    return (
        <Modal show={isModalWindowOpen}>
                <div className="modal-header">
                    <div className="modal-title h4">Добавить канал</div>
                    <button type="button" className="btn-close" aria-label="Close" onClick={hundleCloseModalWindow}></button>
                </div>

                <div className="modal-body">
                    <Form noValidate onSubmit={formik.handleSubmit} className="py-1 rounded-2">
                        <div className="form-group">
                        <Form.Control
                        id="name"
                        name="name"
                        aria-label="Название нового канала"
                        className="p-1 ps-2 form-control"
                        placeholder="Введите сообщение..."
                        onChange={formik.handleChange}
                        value={formik.values.channelName}
                        />
                        </div>
                        <ModalButtton title={'Отменить'} priority={false} onClick={hundleCloseModalWindow}/>
                        <ModalButtton title={'Отправить'} priority={true} onClick={formik.handleSubmit}/>
                    </Form>
                </div>
        </Modal>
    );
}
 
export default ModalWindow;