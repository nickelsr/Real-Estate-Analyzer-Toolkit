export type OutputProps = {
  value: string;
};

export default function Output({ value }: OutputProps) {
  return (
    <div className="text-field-wrapper">
      <span className="text-field-prefix">$</span>
      <input
        className="text-field"
        value={value}
        readOnly
      />
    </div>
  );
}
