export default function Output({ value }) {
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
