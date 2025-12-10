import Input from "@/component/Input";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen sm:p-6 p-3 md:p-16 flex justify-center items-center">
      <form
        action=""
        className="
          w-full 
          max-w-[500px] 
          bg-card 
          px-4
          py-8
          md:p-8 
          rounded-lg 
          space-y-6 
          box-border
        "
      >
        <h3 className="text-primary text-3xl md:text-4xl font-bold text-center md:text-left">
          Login
        </h3>

        <section className="space-y-4">
          
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="font-medium text-sm">
              Email
            </label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="font-medium text-sm">
              Password
            </label>
            <Input
              name="password"
              id="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
        </section>

        <p className="text-sm text-center my-4"></p>

        <div className="flex flex-col space-y-4 md:px-6 px-0">
         <button
          type="submit"
          className="
            w-full 
            bg-primary 
            text-foreground-card
            py-2 
            rounded-lg
            font-semibold 
            hover:bg-primary/80 
            transition
          "
        >
          Login
        </button>

        <Link
  href="/registro"
  className="
    block
    text-center
    w-full 
    bg-transparent 
    border 
    border-primary 
    text-primary
    py-2 
    rounded-lg
    font-semibold 
    hover:bg-primary
    hover:text-foreground-card 
    transition
  "
>
  Registrar
</Link>

        </div>
        
        
      </form>
    </div>
  );
}
