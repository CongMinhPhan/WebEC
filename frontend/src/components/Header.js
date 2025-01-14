import React, { useContext, useState } from 'react';
import Logo from './Logo';
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user); // lay thong tin user
  const dispatch = useDispatch(); // gui hanh dong
  const [menuDisplay, setMenuDisplay] = useState(false); // dieu kien hien thi
  const context = useContext(Context); // truy cap du lieu
  const navigate = useNavigate(); // Điều hướng trang trong React Router
  const searchInput = useLocation(); // Lấy URL hiện tại
  const URLSearch = new URLSearchParams(searchInput?.search); // Phân tích các tham số truy vấn (query parameters)
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }
    if (data.error) {
      toast.error(data.message);
    }
  }
  // dang xuat va dieu huong den trang chu
  
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value); // Cập nhật giá trị tìm kiếm

    if (value) {
      navigate(`/search?q=${value}`); // Điều hướng tới trang tìm kiếm với query
    } else {
      navigate("/search"); // Nếu không có giá trị, chuyển tới trang tìm kiếm chung
    }
  }

  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className='flex items-center'>
          <Link to={"/"}>
            <Logo w={60} h={40} />
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input type='text' placeholder='Tìm kiếm sản phẩm...' className='w-full outline-none' onChange={handleSearch} value={search} />
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <GrSearch />
          </div>
        </div>

        <div className='flex items-center gap-7'>
          <div className='relative flex justify-center'>
            {user?._id && (
              <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(preve => !preve)}>
                {user?.profilePic ? (
                  <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden hover:block md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Quản lý</Link>
                  )}
                  
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"} className='text-2xl relative'>
              <span><FaShoppingCart /></span>
              <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                <p className='text-sm'>{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Đăng xuất</button>
            ) : (
              <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Đăng nhập</Link>
              
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
