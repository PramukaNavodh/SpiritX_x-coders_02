"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const PlayerInfoCardUI = ({ id, Name, Category, University }) => {
  return (
    <div className="mb-5 justify-center text-center mt-10 ml-10 w-70 h-75 bg-white px-4 py-4 rounded-lg shadow-md flex flex-col items-center cursor-pointer hover:scale-103 transition ease-in-out hover:bg-gray-200">
      <Link href={`/playerview/${id}`} passHref>
        <div className="flex flex-col items-center">
          <Image
            src={"/cricketeravat.png"}
            alt={`${Name} Avatar`}
            width={100}
            height={100}
            className="rounded-full"
          />
          <div className="text-xl font-semibold mb-2">{Name}</div>
          <div className="text-gray-600 mb-2 font-bold">{Category}</div>
          <div className="text-sm mb-4">{University}</div>
        </div>
      </Link>
    </div>
  );
};

export default PlayerInfoCardUI;
// "use client";

// import React from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// const PlayerInfoCard = ({ id, Name, Category, University }) => {
//   const router = useRouter();

//   // const handleViewMore = () => {
//   //   router.push(`/playerview/${Name}`); // Dynamic route
//   // };

//   return (
//     <div className="mb-5 justify-center text-center mt-10 ml-10 w-70 h-75 bg-white px-4 py-4 rounded-lg shadow-md flex flex-col items-center cursor-pointer hover:scale-103 transition ease-in-out hover:bg-gray-200">
//       <Link href={`/playerview/${Name}`} passHref>
//         <div className="flex flex-col items-center">
//           <Image
//             src={"/cricketeravat.png"}
//             alt={`${Name} Avatar`}
//             width={100}
//             height={100}
//             className="rounded-full"
//           />
//           <div className="text-xl font-semibold mb-2">{Name}</div>
//           <div className="text-gray-600 mb-2 font-bold">{Category}</div>
//           <div className="text-sm mb-4">{University}</div>
//         </div>
//       </Link>
//       {/* <button
//         // onClick={handleViewMore}
//         className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//         aria-label={`View more information about ${Name}`}
//       >
//         View Info.
//       </button> */}
//     </div>
//   );
// };

// export default PlayerInfoCard;
