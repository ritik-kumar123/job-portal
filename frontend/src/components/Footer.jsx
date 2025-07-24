import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="mt-16 bg-black px-6 pt-8 md:px-16 lg:px-36 w-full text-white">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-10">
        <div className="md:max-w-96">
          <img
            alt="JobPortal Logo"
            className="w-36 h-auto bg-white"
            src={assets.logo}
          />
          <p className="mt-6 text-sm">
            Empowering careers, connecting talent with opportunity. Your journey
            to the perfect job starts here.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg"
              alt="google play"
              className="h-10 w-auto border border-white rounded"
            />
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg"
              alt="app store"
              className="h-10 w-auto border border-white rounded"
            />
          </div>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
          <div>
            <h2 className="font-semibold mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Browse Jobs</a>
              </li>
              <li>
                <a href="#">Post a Job</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+91-9876543210</p>
              <p>support@jobportal.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-sm pb-5">
        © {new Date().getFullYear()} JobPortal. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
