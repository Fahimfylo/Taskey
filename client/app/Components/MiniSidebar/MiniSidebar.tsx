"use client";
import IconCheck from "@/public/icons/IconCheck";
import IconDeleteAll from "@/public/icons/IconDeleteAll";
import IconFileCheck from "@/public/icons/IconFileCheck";
import IconGrid from "@/public/icons/IconGrid";
import IconStopwatch from "@/public/icons/IconStopwatch";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function MiniSidebar() {
  const pathname = usePathname();

  const getStrokeColor = (link: string) => {
    return pathname === link ? "#3aafae" : "#71717a";
  };

  const navItems = [
    {
      icon: <IconGrid strokeColor={getStrokeColor("/")}/>,
      title: "All",
      link: "/",
    },
    {
      icon: <IconFileCheck strokeColor={getStrokeColor("/completed")} />,
      title: "Completed",
      link: "/completed",
    },
    {
      icon: <IconCheck strokeColor={getStrokeColor("/pending")} />,
      title: "Pending",
      link: "/pending",
    },
    {
      icon: <IconStopwatch strokeColor={getStrokeColor("/overdue")} />,
      title: "Overduee",
      link: "/overdue",
    },
  ];

  return (
    <div className="basis-[5rem] flex flex-col bg-[#f9f9f9]">
      <div className="flex items-center justify-center h-[5rem] w-[5rem]">
        <Image src="/logo.png" width={100} height={100} alt="logo" />
      </div>
      <div className="mt-8 flex-1 flex flex-col items-center justify-between">
        <ul className="flex flex-col gap-10 ">
          {navItems.map((item, index) => (
            <li key={index} className="relative group">
              <Link href={item.link}>{item.icon}</Link>
              {/*Hover tooltip */}
              <span className="absolute top-1/2 left-[2.5rem] transform -translate-y-1/2 flex items-center text-xs text-white bg-[#3aafae] px-3 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                {item.title}
                <span className="absolute left-[-4px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[8px] border-r-[#3aafae]"></span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mb-[1.5rem]">
          <button className="w-12 h-12 flex justify-center items-center border-2 border-[#EB4E31] p-2 rounded-full">
            <IconDeleteAll strokeColor="#EB4E31" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MiniSidebar;
