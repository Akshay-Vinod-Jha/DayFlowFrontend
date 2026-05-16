import { motion } from 'framer-motion';

const Loader = ({ label = 'Loading', fullScreen = false }) => {
  return (
    <div className={fullScreen ? 'grid min-h-screen place-items-center bg-slate-950/95' : 'grid place-items-center py-8'}>
      <div className="flex flex-col items-center gap-3">
        <motion.div
          className="h-12 w-12 rounded-full border-4 border-cyan-200 border-t-cyan-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
        />
        <p className="text-sm font-medium text-muted">{label}</p>
      </div>
    </div>
  );
};

export default Loader;
