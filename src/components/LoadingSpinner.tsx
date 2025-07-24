const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-base-content/60">Searching articles...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
