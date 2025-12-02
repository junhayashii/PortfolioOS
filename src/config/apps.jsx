import React from "react";
import { ProfileApp } from "../components/apps/Profile";
import { ProjectsApp } from "../components/apps/Projects";
import { ContactApp } from "../components/apps/Contact";
import { TerminalApp } from "../components/apps/Terminal";
import { SettingsApp } from "../components/apps/Settings";
import { CertificatesApp } from "../components/apps/Certificates";
import {
  User,
  Folder,
  SquareTerminal,
  Mail,
  Settings,
  Award,
} from "lucide-react";

/* アプリケーション設定の配列 */
export const APPS = [
  {
    id: "profile",
    title: "Profile",
    icon: <User className="w-full h-full text-blue-500" />,
    component: <ProfileApp />,
    defaultSize: { width: 950, height: 700 },
    initialPosition: { x: 190, y: 50 },
  },
  {
    id: "projects",
    title: "Projects",
    icon: <Folder className="w-full h-full text-yellow-500" />,
    component: <ProjectsApp />,
    defaultSize: { width: 900, height: 600 },
    initialPosition: { x: 150, y: 80 },
  },
  {
    id: "certificates",
    title: "Certificates",
    icon: <Award className="w-full h-full text-purple-500" />,
    component: <CertificatesApp />,
    defaultSize: { width: 700, height: 600 },
    initialPosition: { x: 180, y: 130 },
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: <SquareTerminal className="w-full h-full text-black-500" />,
    component: <TerminalApp />,
    defaultSize: { width: 600, height: 400 },
    initialPosition: { x: 200, y: 200 },
  },
  {
    id: "contact",
    title: "Contact",
    icon: <Mail className="w-full h-full text-green-500" />,
    component: <ContactApp />,
    defaultSize: { width: 1000, height: 600 },
    initialPosition: { x: 250, y: 140 },
  },
  {
    id: "settings",
    title: "Settings",
    icon: <Settings className="w-full h-full text-gray-400" />,
    component: <SettingsApp />,
    defaultSize: { width: 650, height: 600 },
    initialPosition: { x: 300, y: 150 },
  },
];
