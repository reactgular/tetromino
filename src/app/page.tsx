import {App} from '../components/templates/App';
import {Providers} from '../components/templates/Providers';

/**
 * Read the package.json within a server component, so we don't
 * expose the entire package.json to the client.
 */
const getPackageJsonVersion = () => {
    try {
        return require('../../package.json').version;
    } catch (err) {
        console.error('Could not find package.json. Please make sure the file exists and is valid JSON.', err);
        return '0.0.0';
    }
};

export default function Home() {
    return (
        <Providers>
            <App version={getPackageJsonVersion()} />
        </Providers>
    );
}
