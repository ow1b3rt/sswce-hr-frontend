import Image from 'next/image';

export function Logo({ panel }) {
  return (
    <div className="flex max-h-24 items-center overflow-hidden">
      {panel ? (
        <img
          src="/images/logo.svg"
          alt="Logo"
          className="h-auto w-full object-contain"
        />
      ) : (
        <img
          src="/images/logo.svg"
          alt="Logo"
          className="h-12 w-full rounded-md object-contain"
        />
      )}
    </div>
  );
}
