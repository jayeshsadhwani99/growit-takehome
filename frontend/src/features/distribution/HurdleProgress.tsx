export function HurdleProgress({ progress }: { progress: number | null }) {
  if (progress === null) {
    return <progress className="hurdle-progress" aria-label="Owed amount is not stored for this hurdle" />;
  }

  return (
    <progress
      className="hurdle-progress"
      max={100}
      value={progress}
      aria-label={`${progress} percent of this hurdle filled`}
    />
  );
}
