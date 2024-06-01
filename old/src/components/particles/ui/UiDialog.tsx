import {Dialog, useMediaQuery} from '@material-ui/core';
import classNames from 'classnames';
import {FC, useMemo} from 'react';
import {FaArrowLeft} from 'react-icons/fa';
import {useModalView} from '../hooks/useModalView';
import {ClassNameProps} from '../particles.types';
import './UiDialog.css';

export interface UiDialogProps {
    large?: boolean;

    onClose?: () => void;

    open: boolean;

    title: string;
}

export const UiDialog: FC<UiDialogProps & ClassNameProps> = ({
    onClose = () => null,
    open,
    title,
    large,
    children,
    className
}) => {
    const smallScreen = useMediaQuery('(max-width:375px)');
    const fullScreen = useMemo(
        () => large && smallScreen,
        [large, smallScreen]
    );

    useModalView(open, title);

    return (
        <Dialog
            className={classNames('ui-dialog', {fullScreen})}
            PaperProps={{
                className: classNames('ui-dialog-paper', className, {
                    'border-primary': !fullScreen,
                    fullScreen
                })
            }}
            open={open}
            onClose={onClose}
            fullScreen={fullScreen}
        >
            <div className="ui-dialog-title text-primary">
                {title}
                {large && (
                    <button
                        className="ml:hidden flex absolute top-0 -left-3 p-3 dark:text-white text-black text-sm"
                        onClick={onClose}
                    >
                        <FaArrowLeft />
                    </button>
                )}
            </div>
            <div className="flex flex-col">{children}</div>
        </Dialog>
    );
};
