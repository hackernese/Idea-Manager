import { useOutlet } from 'react-router-dom';

function Submission() {
    const outlet = useOutlet();

    if (outlet) {
        return outlet;
    }

    return <h2>Submission</h2>;
}

export default Submission;
