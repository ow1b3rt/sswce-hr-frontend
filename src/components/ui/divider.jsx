const Divider = ({
  className = '',
  backgroundColor = 'bg-themeBlack/30 dark:bg-white',
  orientation = 'horizontal',
  height = 'h-auto',
  width = 'w-0.5',
}) => {
  const orientationClasses =
    orientation === 'vertical'
      ? `${width} ${height} self-stretch shrink-0`
      : 'w-full h-0.5 shrink-0';

  return (
    <div className={`${backgroundColor} ${orientationClasses} ${className}`} />
  );
};

export default Divider;
