import React, {FC} from 'react';
import {FaCheck, FaTimes} from 'react-icons/fa';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../../store/app-store';
import {AppActions} from '../../../store/app/app-actions';
import {AppSelectors} from '../../../store/app/app-selectors';
import {UiButton} from '../../particles/ui/UiButton';

export const OptionsGame: FC = () => {
    const ghostPiece = useSelector(AppSelectors.ghostPiece);
    const dispatch = useAppDispatch();
    return (
        <>
            <div>Ghost Piece</div>
            <UiButton
                className="flex rounded-full text-[12px] p-2 justify-center"
                active={ghostPiece}
                onClick={() => dispatch(AppActions.ghostPiece())}
            >
                {ghostPiece ? <FaCheck /> : <FaTimes />}
            </UiButton>
        </>
    );
};
