export function HurdleProgress({ progress }: { progress: number | null }) {
  if (progress === null) {
    return <progress className="hurdle-progress" aria-label="Owed amount is not stored for this hurdle" />;
  }

  const empty = progress <= 0;

  return (
    <progress
      className={empty ? "hurdle-progress is-empty" : "hurdle-progress"}
      max={100}
      value={progress}
      aria-label={empty ? "Nothing paid on this hurdle" : `${progress} percent of this hurdle filled`}
    />
  );
}
