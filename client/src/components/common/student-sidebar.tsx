'use client';

import * as React from 'react';
import { BookOpenIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavUser } from './nav-user';
import { NavMain } from './nav-main';

const studentNavItems = [
  {
    title: 'Dashboard',
    url: '/student',
    icon: BookOpenIcon,
  },
];

export function StudentSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/student">
                <BookOpenIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Student Portal</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={studentNavItems} quickActionLabel="Quick Review"/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: 'Student User',
            email: 'student@example.com',
            avatar: '/avatars/student.jpg',
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
