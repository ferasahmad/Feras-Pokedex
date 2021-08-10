import Image from "next/image";

const Navbar = () => {
  return ( 
    <nav>
      <Image src="/logo.png" width={220} height={40} alt="" />
    </nav>
   );
}
 
export default Navbar;