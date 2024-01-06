"use client";

const Navbar = () => {
  return (
    <div className="fixed  bg-white w-[calc(100%)] z-50">
      <div className="flex h-12 max-h-12 items-center px-4 border-b relative">
        <a className="block" href="/"></a>
        <div className="ml-auto flex items-center space-x-4"></div>
      </div>
    </div>
  );
};

export default Navbar;
