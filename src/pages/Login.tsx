
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { LockKeyhole, User, Info } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setErrorMessage("请输入用户名和密码");
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage("");
    
    try {
      const success = await login(username, password);
      if (success) {
        navigate("/");
      } else {
        setErrorMessage("用户名或密码错误");
      }
    } catch (error) {
      setErrorMessage("登录过程中发生错误");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-primary">
            <h1 className="text-2xl font-bold text-white">HM</h1>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            医院管理系统
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            请使用您的账号登录
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>用户登录</CardTitle>
            <CardDescription>
              请输入您的用户名和密码进行登录
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">用户名</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    placeholder="请输入用户名"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">密码</Label>
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="请输入密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {errorMessage && (
                <Alert variant="destructive">
                  <Info className="h-4 w-4" />
                  <AlertTitle>登录失败</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "登录中..." : "登录"}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="w-full space-y-4">
              <div className="text-center text-sm text-gray-500">
                演示账号
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded border p-2">
                  <div className="font-semibold">医生账号</div>
                  <div>用户名: doctor</div>
                  <div>密码: 123456</div>
                </div>
                <div className="rounded border p-2">
                  <div className="font-semibold">药房管理员</div>
                  <div>用户名: pharmacy</div>
                  <div>密码: 123456</div>
                </div>
                <div className="rounded border p-2">
                  <div className="font-semibold">财务人员</div>
                  <div>用户名: finance</div>
                  <div>密码: 123456</div>
                </div>
                <div className="rounded border p-2">
                  <div className="font-semibold">系统管理员</div>
                  <div>用户名: admin</div>
                  <div>密码: 123456</div>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
