import Portal from "@/app/shared/ui/Portal/Portal.tsx";
import {Button} from "@/app/shared/ui/Button/Button.tsx";

type ModalProps = {
    id?: string;
    title: string;
    description?: string;
    onConfirm: () => void;
    children?: React.ReactNode;
};

const Modal = ({
                   id = "modal-container-id",
                   title,
                   description,
                   children,
               }: ModalProps) => {
    return (
        <Portal id={id}>
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                    <h2 className="text-lg font-bold mb-4">{title}</h2>
                    {description && <p className="text-gray-700 mb-7">{description}</p>}
                    {children}

                    <div className="flex justify-between gap-2">
                        <Button variant="primary" className="flex-1">Yes</Button>
                        <Button variant="outline" className="flex-1">No</Button>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default Modal;
