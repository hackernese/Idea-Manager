import { useOutlet } from 'react-router-dom';

function SubmissionID() {
    const outlet = useOutlet();

    if (outlet) {
        return outlet;
    }

    return (
        <div>
            <h1>This is the submission id page</h1>
        </div>
    );
}

export default SubmissionID;
