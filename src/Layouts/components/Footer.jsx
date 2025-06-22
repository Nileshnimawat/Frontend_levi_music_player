const Footer = () => {
  return (
    <footer className="bg-[#121212] text-white px-6 py-10 border-t border-gray-800 ">
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
        <div>
          <h4 className="font-bold mb-2">Company</h4>
          <ul className="space-y-1 text-gray-400">
            <li>About</li>
            <li>Jobs</li>
            <li>For the Record</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Communities</h4>
          <ul className="space-y-1 text-gray-400">
            <li>For Artists</li>
            <li>Developers</li>
            <li>Advertising</li>
            <li>Investors</li>
            <li>Vendors</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Useful links</h4>
          <ul className="space-y-1 text-gray-400">
            <li>Support</li>
            <li>Free Mobile App</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Levi Plans</h4>
          <ul className="space-y-1 text-gray-400">
            <li>Premium Individual</li>
            <li>Premium Duo</li>
            <li>Premium Family</li>
            <li>Premium Student</li>
            <li>Levi Free</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
        © 2025 Levi AB
      </div>
    </footer>
  );
};

export default Footer;
