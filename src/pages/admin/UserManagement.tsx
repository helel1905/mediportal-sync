
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoleManagement from "@/components/admin/RoleManagement";
import UserInfoManagement from "@/components/admin/UserInfoManagement";

const UserManagement = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">用户权限管理</h1>
        <p className="text-muted-foreground mb-6">管理系统用户权限，创建和编辑用户角色，分配权限</p>

        <Tabs defaultValue="roles" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="roles">角色权限管理</TabsTrigger>
            <TabsTrigger value="users">用户信息管理</TabsTrigger>
          </TabsList>
          
          <TabsContent value="roles">
            <RoleManagement />
          </TabsContent>
          
          <TabsContent value="users">
            <UserInfoManagement />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default UserManagement;
