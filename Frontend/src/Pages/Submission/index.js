import { useOutlet } from 'react-router-dom';
import AnimatedOutlet from '../../Components/AnimatedOutlet';

function Submission() {
    const outlet = useOutlet();

    if (outlet) {
        return outlet;
    }

    return (
        <AnimatedOutlet>
            <h2>Submission</h2>
        </AnimatedOutlet>
    );
}

export default Submission;
