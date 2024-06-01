import classNames from 'classnames';
import {FC} from 'react';
import {FaGithub} from 'react-icons/fa';
import {environment} from '../../../environment/environment';
import {ClassNameProps} from '../../particles/particles.types';

export interface AppCopyrightProps {
    version: string;
}

export const AppCopyright: FC<AppCopyrightProps & ClassNameProps> = ({version, className}) => {
    return (
        <div className={classNames(className, 'flex text-xs space-x-2')}>
            <div>Version {version}</div>
            <a
                href={environment.github}
                className="flex text-primary hover:underline items-center space-x-1"
            >
                <FaGithub />
                <span>Source</span>
            </a>
        </div>
    );
};
