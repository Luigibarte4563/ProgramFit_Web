interface ResultCardProps {
  rank: number;
  program: string;
  percentage: number;
  description?: string;
}

export default function ResultCard({
  rank,
  program,
  percentage,
  description,
}: ResultCardProps) {
  return (
    <div className="w-full bg-[#FFFFFF] rounded-2xl border-2 border-[#C5C5C5] p-6 shadow-[6px_6px_0px_0px_#1D3557] flex flex-col justify-between transition-all duration-200">
      <div>
        {/* Header Section: Rank and Program Title */}
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-bold text-[#000000] leading-tight">
            <span className="text-[#2F8CE5] mr-1">#{rank}</span> {program}
          </h2>

          {/* Neo-Brutalist Badge for Percentage */}
          <span className="shrink-0 rounded-xl bg-[#2F8CE5] border-2 border-[#1D3557] px-3.5 py-1.5 text-sm font-black text-[#FFFFFF] shadow-[2px_2px_0px_0px_#1D3557]">
            {percentage}%
          </span>
        </div>

        {/* Divider & Description */}
        {description && (
          <div className="mt-4 border-t-2 border-[#F7EBE1] pt-3">
            <p className="text-sm text-[#0D1B2A] leading-relaxed">
              {description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
