// SectionTitle.jsx
const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="my-10 text-center max-w-md mx-auto">
      <p className="text-yellow-500 text-sm md:text-base tracking-wide mb-3">
        {subHeading}
      </p>
      <h2 className="text-2xl italic md:text-4xl font-extrabold uppercase bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent tracking-widest drop-shadow-lg">
        {heading}
      </h2>
      <div className="mt-2 w-20 mx-auto border-b-4 border-yellow-400 rounded-full"></div>
    </div>
  );
};

export default SectionTitle;
