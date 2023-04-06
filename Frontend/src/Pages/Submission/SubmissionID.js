import { useOutlet } from 'react-router-dom';
import AnimatedOutlet from '../../Components/AnimatedOutlet';

function SubmissionID() {
    const outlet = useOutlet();

    if (outlet) {
        return outlet;
    }

    return (
        <AnimatedOutlet>
            <div>
                <h1>This is the submission id page</h1>
            </div>
        </AnimatedOutlet>
    );
}

export default SubmissionID;
