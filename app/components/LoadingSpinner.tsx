export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center" role="status">
      <div className="loading-spinner" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}