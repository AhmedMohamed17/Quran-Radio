const Slider = ({ value, onValueChange, min = 0, max = 1, step = 0.05 }) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onValueChange([parseFloat(e.target.value)])}
      className="w-48"
    />
  );
};

export default Slider;
