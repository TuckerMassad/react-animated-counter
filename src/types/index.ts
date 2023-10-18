export interface AnimatedCounterProps {
  value?: number;
  fontSize?: string;
  color?: string;
  incrementColor?: string;
  decrementColor?: string;
  includeDecimals?: boolean;
}

export interface NumberColumnProps {
  digit: string;
  delta: string | null;
  fontSize: string;
  color: string;
  incrementColor: string;
  decrementColor: string;
  includeDecimals: boolean;
}

export interface DecimalColumnProps {
  fontSize: string;
  color: string;
}