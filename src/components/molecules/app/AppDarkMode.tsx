import {FC} from 'react';
import {FaMoon, FaSun} from 'react-icons/fa';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../../store/app-store';
import {AppActions} from '../../../store/app/app-actions';
import {AppSelectors} from '../../../store/app/app-selectors';
import {UiToggle} from '../../particles/ui/UiToggle';
import {ClassNameProps} from '../../particles/particles.types';

export interface AppDarkModeProps {
    selectDark?: () => boolean;
}

export const AppDarkMode: FC<AppDarkModeProps & ClassNameProps> = ({
    selectDark = AppSelectors.dark,
    className
}) => {
    const dark = useSelector(selectDark);
    const dispatch = useAppDispatch();
    return (
        <UiToggle
            className={className}
            onChange={(value) => dispatch(AppActions.dark(value))}
            value={dark}
            iconOn={<FaMoon className="text-blue-200" />}
            iconOff={<FaSun className="text-yellow-500" />}
        />
    );
};
