
import { Insight } from "@/types/insights";

interface PaymentHabitBadgeProps {
  paymentHabit: Insight['paymentHabit'];
}

export function PaymentHabitBadge({ paymentHabit }: PaymentHabitBadgeProps) {
  const getScoreConfig = (score: string) => {
    switch (score) {
      case 'Excellent':
        return { textColor: '#007737', bgColor: '#E6F4EA' };
      case 'Good':
        return { textColor: '#1750FB', bgColor: '#E3F2FD' };
      case 'Fair':
        return { textColor: '#F2AE40', bgColor: '#FFF8E1' };
      case 'Poor':
        return { textColor: '#DF1C41', bgColor: '#FFEBEE' };
      default:
        return { textColor: '#9CA3AF', bgColor: '#F3F4F6' };
    }
  };

  const config = getScoreConfig(paymentHabit.score);

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs text-gray-500">
        DSO: {paymentHabit.dso}d | {paymentHabit.terms}
      </div>
      <span
        className="inline-flex items-center px-4 py-1.5 rounded-full font-medium whitespace-nowrap min-w-0 flex-shrink-0"
        style={{
          color: config.textColor,
          backgroundColor: config.bgColor,
          fontSize: '12px'
        }}
      >
        {paymentHabit.score}
      </span>
    </div>
  );
}
