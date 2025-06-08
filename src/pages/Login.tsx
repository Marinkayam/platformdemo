
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { MontoLogo } from '@/components/MontoLogo';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'maya@montopay.com' && password === '12345') {
      toast({
        title: "Login successful",
        description: "Welcome back!"
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Login failed",
        description: "Incorrect email or password",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="grid grid-cols-2 min-h-screen">
      {/* Left Panel - Login Form */}
      <div className="flex flex-col justify-center px-12">
        <div className="mx-auto w-full max-w-sm space-y-6">
          {/* Monto Logo - 50% smaller */}
          <div className="flex justify-center">
            <MontoLogo className="mb-6 w-[52px] h-[15px]" />
          </div>

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-[#12141D] text-center">Welcome</h1>
            <p className="text-sm text-muted-foreground">Sign In</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Your email
              </Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe} 
                  onCheckedChange={checked => setRememberMe(checked as boolean)} 
                />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
              </div>
              <a href="#" className="text-sm text-[#7B59FF] hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <Button 
              type="submit" 
              className="w-full bg-[#7B59FF] hover:bg-[#6B49EF] text-white rounded-md px-4 py-2 mt-4" 
              size="lg"
            >
              Login
            </Button>
          </form>

          {/* Logo and Version */}
          <div className="text-center space-y-2">
            <img src="/monto-logo.svg" alt="Monto Logo" className="h-4 mx-auto" />
          </div>

          {/* Footer Links */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              <a href="#" className="hover:underline">Terms of Service</a>
              {" | "}
              <a href="#" className="hover:underline">Privacy Policy</a>
              {" | "}
              <a href="#" className="hover:underline">Support</a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Illustration */}
      <div className="bg-[#FAFAFA] flex flex-col justify-center items-center text-center px-8">
        <div className="max-w-md space-y-8">
          {/* Tagline - Doubled size */}
          <div className="text-4xl text-[#12141D] text-center leading-tight py-[17px]">
            You should get paid on time,<br />
            <strong>every time.</strong>
          </div>

          {/* Desk Illustration - Doubled size */}
          <div className="flex justify-center">
            <img 
              alt="Desk Illustration" 
              src="/lovable-uploads/f1aa6c2a-356d-4e7c-86ef-601b891b80c3.png" 
              className="w-[800px] max-w-full h-auto object-fill" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
