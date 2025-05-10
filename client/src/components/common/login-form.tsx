import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoginFormProps extends React.ComponentProps<'div'> {
  type: 'login' | 'register';
}

export function LoginForm({ className, type = 'login', ...props }: LoginFormProps) {
  const isRegister = type === 'register';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(`${type.toUpperCase()} data:`, data);
    // Submit logic here (e.g., API call)
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 gap-6 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">
                  {isRegister ? 'Create an account' : 'Welcome back'}
                </h1>
                <p className="text-balance text-muted-foreground">
                  {isRegister ? 'Register to use SMS' : 'Login to your SMS account'}
                </p>
              </div>

              {isRegister && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" placeholder="John Doe" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+250..." required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="gender">Gender</Label>
                    <select
                      id="gender"
                      name="gender"
                      className="rounded-md border px-3 py-2 text-sm"
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </>
              )}

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>

              {!isRegister && (
                <div className="flex items-end justify-end pt-2">
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 underline"
                  >
                    Forgot your password?
                  </a>
                </div>
              )}

              <Button type="submit" className="w-full">
                {isRegister ? 'Register' : 'Login'}
              </Button>

              <div className="text-center text-sm">
                {isRegister ? (
                  <>
                    Already have an account?{' '}
                    <a href="#" className="underline underline-offset-4">
                      Login
                    </a>
                  </>
                ) : (
                  <>
                    Don&apos;t have an account?{' '}
                    <a href="#" className="underline underline-offset-4">
                      Sign up
                    </a>
                  </>
                )}
              </div>
            </div>
          </form>

          <div className="relative hidden bg-muted md:block">
            <img
              src="/auth_bg_img.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
