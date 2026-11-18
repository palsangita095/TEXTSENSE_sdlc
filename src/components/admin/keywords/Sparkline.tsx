interface SparklineProps {
  points: number[];
  viewWidth?: number;
  viewHeight?: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: boolean;
  fillOpacity?: number;
  endDot?: boolean;
  className?: string;
}

function buildLinePath(points: number[], width: number): string {
  if (points.length === 0) return "";

  if (points.length === 1) {
    return `M2 ${points[0]} L${width - 2} ${points[0]}`;
  }

  const step = (width - 4) / (points.length - 1);

  return points
    .map((y, index) => `${index === 0 ? "M" : "L"}${(2 + index * step).toFixed(1)} ${y}`)
    .join(" ");
}

export default function Sparkline({
  points,
  viewWidth = 140,
  viewHeight = 35,
  stroke = "#4338CA",
  strokeWidth = 1.5,
  fill = false,
  fillOpacity = 0.08,
  endDot = false,
  className = "h-9 w-24 sm:w-32",
}: SparklineProps) {
  const linePath = buildLinePath(points, viewWidth);
  const areaPath = `${linePath} L${viewWidth - 2} ${viewHeight} L2 ${viewHeight} Z`;
  const lastY = points[points.length - 1];

  return (
    <svg
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true">
      {fill && <path d={areaPath} fill={stroke} opacity={fillOpacity} />}

      <path
        d={linePath}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {endDot && points.length > 0 && (
        <circle cx={viewWidth - 2} cy={lastY} r={3} fill={stroke} />
      )}
    </svg>
  );
}
