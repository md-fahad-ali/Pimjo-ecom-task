"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Dropdown } from "../dropdown/Dropdown";
import { DropdownItem } from "../dropdown/DropdownItem";
import { useTheme } from "../../context/ThemeContext";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const { theme } = useTheme();

  // Demo notifications to mirror the design
  const notifications = [
    {
      id: 1,
      name: "Terry Franci",
      message: "requests permission to change",
      project: "Project - Nganter App",
      time: "5 min ago",
      avatar: "/assets/avatar-1.png",
      status: "success" as const,
    },
    {
      id: 2,
      name: "Alena Franci",
      message: "requests permission to change",
      project: "Project - Nganter App",
      time: "8 min ago",
      avatar: "/assets/avatar-2.png",
      status: "success" as const,
    },
    {
      id: 3,
      name: "Jocelyn Kenter",
      message: "requests permission to change",
      project: "Project - Nganter App",
      time: "15 min ago",
      avatar: "/assets/avatar-3.png",
      status: "success" as const,
    },
    {
      id: 4,
      name: "Brandon Philips",
      message: "requests permission to change",
      project: "Project - Nganter App",
      time: "1 hr ago",
      avatar: "/assets/avatar-4.png",
      status: "danger" as const,
    },
  ];

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleClick = () => {
    toggleDropdown();
    setNotifying(false);
  };
  return (
    <div className="relative">
      <button
        className="relative dropdown-toggle flex items-center justify-center transition-colors rounded-full h-11 w-11 border"
        style={{
          color: 'var(--secondary)',
          borderColor: 'var(--border)'
        }}
        onClick={handleClick}
      >
        <span
          className={`absolute right-0 top-0.5 z-10 h-2 w-2 rounded-full shadow-theme-lg bg-orange-400 ${
            !notifying ? "hidden" : "flex"
          }`}
        >
          <span className="absolute inline-flex w-full h-full bg-orange-400 rounded-full opacity-75 animate-ping"></span>
        </span>
        <svg
          className="fill-current"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H4.37504H15.625H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248ZM14.875 14.4591V9.16748C14.875 6.47509 12.6924 4.29248 10 4.29248C7.30765 4.29248 5.12504 6.47509 5.12504 9.16748V14.4591H14.875ZM8.00004 17.7085C8.00004 18.1228 8.33583 18.4585 8.75004 18.4585H11.25C11.6643 18.4585 12 18.1228 12 17.7085C12 17.2943 11.6643 16.9585 11.25 16.9585H8.75004C8.33583 16.9585 8.00004 17.2943 8.00004 17.7085Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="-right-[240px] mt-[17px] flex h-[480px] w-[350px] flex-col rounded-2xl p-3 sm:w-[361px] lg:right-0 border"
        style={
          theme === 'dark'
            ? { backgroundColor: '#1A2231', borderColor: '#1D2939' }
            : { boxShadow: '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)' }
        }
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-border">
          <h5 className="text-lg font-semibold text-foreground">
            Notification
          </h5>
          <button
            onClick={toggleDropdown}
            className="text-secondary transition dropdown-toggle hover:text-foreground"
          >
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col h-auto overflow-y-auto custom-scrollbar">
          {notifications.map((n, idx) => (
            <li key={n.id}>
              <DropdownItem
                onItemClick={closeDropdown}
                className={`flex gap-3 rounded-xl p-3 px-4.5 py-3 ${
                  theme === 'dark' ? 'hover:bg-[#202a3a]' : 'hover:bg-[#ecf3ff]'
                } ${
                  idx !== notifications.length - 1
                    ? theme === 'dark'
                      ? 'border-b border-[#344054]'
                      : 'border-b border-[#E4E7EC]'
                    : ''
                }`}
              >
                <span className="relative z-1 h-10 w-10 flex-shrink-0 rounded-full">
                  <span className="absolute inset-0 overflow-hidden rounded-full">
                    <Image
                      src={n.avatar}
                      alt={n.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </span>
                  <span
                    className={`absolute -bottom-[2px] -right-[2px] z-10 h-[16px] w-[16px] rounded-full border-2 ${theme === "dark" ? "border-gray-900" : "border-white"} ${
                      n.status === "success" ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                </span>

                <span className="block">
                  <span className="mb-1.5 space-x-1 block text-theme-sm">
                    <span className="font-medium" style={{ color: 'var(--foreground)' }}>{n.name}</span>
                    <span style={{ color: theme === 'dark' ? '#98A2B3' : '#667085' }}>{n.message}</span>
                    <span className="font-medium" style={{ color: 'var(--foreground)' }}>{n.project}</span>
                  </span>

                  <span
                    className="flex items-center gap-2 text-theme-xs"
                    style={{ color: theme === 'dark' ? '#E4E7EC' : '#667085' }}
                  >
                    <span style={{ color: theme === 'dark' ? '#E4E7EC' : '#667085' }}>Project</span>
                    <span
                      className="w-1 h-1 rounded-full"
                      style={{ backgroundColor: theme === 'dark' ? '#E4E7EC' : '#667085' }}
                    ></span>
                    <span style={{ color: theme === 'dark' ? '#E4E7EC' : '#667085' }}>{n.time}</span>
                  </span>
                </span>
              </DropdownItem>
            </li>
          ))}
        </ul>
        <Link
          href="/"
          className={`block px-4 py-2 mt-3 ${theme === 'dark' ? 'bg-[#1d2939] border-[#344054]' : 'bg-[transparent] border-[#d0d5dd] text-[#344054] hover:bg-[#f2f4f7]'} text-sm font-medium text-center rounded-lg border`}
          
        >
          View All Notifications
        </Link>
      </Dropdown>
    </div>
  );
}
