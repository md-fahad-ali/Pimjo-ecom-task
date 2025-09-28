"use client";
import React, {  useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../../context/SidebarContext";
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { RxDashboard } from "react-icons/rx";
import { IoCubeOutline } from "react-icons/io5";
import { useTheme } from "@/app/context/ThemeContext";


type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <RxDashboard className="w-5 h-5" />,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <IoCubeOutline className="w-5 h-5" />,
    name: "Products",
    path: "/dashboard/products",
  },
];


const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const { theme } = useTheme();

  const renderMenuItems = (
    navItems: NavItem[],
    
  ) => (
    <ul className="flex flex-col gap-2 w-full overflow-x-hidden">
      {navItems.map((nav) => (
        <li key={nav.name} className="w-full overflow-x-hidden">
          {nav.path && !nav.subItems && (
            <Link
              href={nav.path}
              className={`group flex w-full items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive(nav.path)
                  ? (theme === "dark"
                      ? "bg-[#1a2231] text-[#7592FF]"
                      : "bg-[#ecf3ff] text-blue-600")
                  : "text-secondary " + (theme === "dark"
                      ? "hover:bg-[#1a2231] hover:text-[#7592FF]"
                      : "hover:bg-[#ecf3ff] hover:text-blue-600")
              } ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
            >
              <span className="shrink-0 inline-flex items-center justify-center text-current">
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`text-sm font-medium whitespace-nowrap`}>{nav.name}</span>
              )}
            </Link>
          )}

          
        </li>
      ))}
    </ul>
  );

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 h-screen transition-all duration-300 ease-in-out z-50 border-r overflow-x-hidden box-border
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      style={{
        backgroundColor: theme === 'dark' ? 'var(--background)' : 'var(--panel)',
        color: 'var(--foreground)',
        borderColor: 'var(--border)'
      }}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex  ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              { theme === "dark" ? 
               <Image
               
               src="/assets/logo-dark.svg"
               alt="Logo"
               width={150}
               height={40}
             />
            :
            <Image
                
                src="/assets/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
           
            }
              
              
            </>
          ) : (
            <Image
              src="/assets/logo.png"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-secondary ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <EllipsisVerticalIcon className="w-5 h-5" />
                )}

              </h2>
              {renderMenuItems(navItems)}
            </div>

            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                
              </h2>
              
            </div>
          </div>
        </nav>
       
      </div>
    </aside>
  );
};

export default AppSidebar;

