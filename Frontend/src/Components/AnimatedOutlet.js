import { motion } from 'framer-motion';

// This component utilizes framer.motion to add transition to a specific
// component which will be mounted and unmounted later on

// Outlet animation
const animations = {
    i: { opacity: 0, x: -50 },
    a: { opacity: 1, x: 0 },
    e: { opacity: 0, x: 50 },
};

function AnimatedOutlet({ children }) {
    return (
        <motion.div variants={animations} initial="i" animate="a" exit="e" transition={{ duration: 0.1 }}>
            {children}
        </motion.div>
    );
}

export default AnimatedOutlet;
