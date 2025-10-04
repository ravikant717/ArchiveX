
const GifLoader = ({ gif = "/Kaleidoscope.gif" }) => {
  return (
    <div className="fixed inset-0 flex size-xl items-center justify-center bg-white z-50">
      <img
        src={gif}
        alt="Loading..."
        className="w-36 h-36"
      />
    </div>
  );
};

export default GifLoader;
