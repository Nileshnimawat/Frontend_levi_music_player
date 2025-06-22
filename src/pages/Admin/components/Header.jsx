
import { NavLink } from "react-router-dom";
import logo from "@/assets/rounded.png"

const Header = () => {
	return (
		<div className='flex items-center justify-between'>
			<div className='flex items-center gap-3 mb-8'>
				<NavLink to='/' className='rounded-lg'>
					<img src={logo} className='size-10 text-black' />
				</NavLink>
				<div>
					<h1 className='text-3xl font-bold'>Music Manager</h1>
					<p className='text-zinc-400 mt-1'>Manage your music catalog</p>
				</div>
			</div>
			{/* <UserButton /> */}
		</div>
	);
};
export default Header;