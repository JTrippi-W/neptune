const SkeletonLoader = () => {
  return (
    <div
      data-testid="skeleton-loader"
      style={{
        border: '1px solid #ccc',
        marginBottom: '10px',
        padding: '20px',
        borderRadius: '5px'
      }}>
      <div
        style={{
          backgroundColor: '#eee',
          height: '20px',
          marginBottom: '10px',
          width: '70%'
        }}></div>
      <div style={{ backgroundColor: '#eee', height: '15px', width: '50%' }}></div>
    </div>
  );
};

export default SkeletonLoader;
