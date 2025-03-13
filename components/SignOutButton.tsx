import {signOUt } from "@/auth";
   
export default function SignOutButton() {
 return (
     <form
     action={async () => {
     
         await signOUt();
     }}
     >
      <button
                 onClick={() => console.log('Logout clicked')}
             className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
             >
                 <img 
                 src="/icons/power.png"
                 alt="Logout"
                 className="h-4 w-4" />
             </button>   
     </form>
 )
}
 
 
 
 
 
 
 
