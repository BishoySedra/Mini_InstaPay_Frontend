import { Link } from "react-router-dom";
export default function Card({ title, image, onClick ,label,isProfilePage}) {
  return (
   <div onClick={onClick}>
     <Link
      className="flex items-center justify-center flex-col bg-orange-200 rounded-lg p-6 shadow-md transition-transform transform hover:scale-105 hover:bg-orange-300 cursor-pointer"
      to={isProfilePage ? "/users/showBankAccounts" : `/tab/${label}`}
    >
      <div className="w-20 h-20 bg-orange-400 rounded-full flex items-center justify-center shadow-inner">
        <img src={image} alt={title} className="w-12 h-12" />
      </div>
      <h3 className="mt-4 font-semibold text-black">{title}</h3>
    </Link>
   </div>
  );
}
