const EventDateBadge = ({ time }) => {
  const date = new Date(time);

  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();

  return (
    <div className="bg-primary-red flex w-14 flex-col items-center justify-center rounded-lg border border-gray-200 py-1.5 shadow-sm">
      <span className="text-xs font-medium text-white uppercase">{month}</span>
      <span className="text-xl leading-tight font-bold text-white">{day}</span>
    </div>
  );
};

export default EventDateBadge;
