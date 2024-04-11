import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiOutlineBookOpen, HiOutlineBriefcase, HiOutlineCash, HiOutlineChat, HiOutlineCloud, HiOutlineFire, HiOutlinePencil, HiShoppingBag, HiSupport, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';

const SideBar = () => {
  return (
    <Sidebar aria-label="Sidebar with content separator example">

      <Sidebar.Logo href="#" img="/favicon.svg" imgAlt="K-ONE logo">
        K-One fitness
      </Sidebar.Logo>
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        <Sidebar.Item href="/admin/dashboard" icon={HiChartPie}>
          Dashboard
        </Sidebar.Item>
        <Sidebar.Item href="#" icon={HiInbox}>
          Inbox
        </Sidebar.Item>
        <Sidebar.Item href="#" icon={HiUser}>
          Users
        </Sidebar.Item>
        <Sidebar.Collapse icon={HiShoppingBag} label="Products Management">
            <Sidebar.Item icon={HiOutlineCloud} href="/admin/dashboard/upload"> Upload Products</Sidebar.Item>
            <Sidebar.Item icon={HiOutlineBriefcase} href="/admin/dashboard/manage"> Product Management</Sidebar.Item>

          </Sidebar.Collapse>
          <Sidebar.Collapse icon={HiOutlineFire} label="Workout Management">
            <Sidebar.Item  href="#"> lorem</Sidebar.Item>
            <Sidebar.Item  href="#"> lorem</Sidebar.Item>

          </Sidebar.Collapse>
          <Sidebar.Collapse icon={HiOutlineBookOpen} label="Booking Management">
            <Sidebar.Item  href="#">lorem</Sidebar.Item>
            <Sidebar.Item  href="#">lorem</Sidebar.Item>

          </Sidebar.Collapse>
          <Sidebar.Collapse icon={HiOutlineCash} label="Payment Management">
            <Sidebar.Item  href="#">lorem</Sidebar.Item>
            <Sidebar.Item  href="#"> lorem</Sidebar.Item>

          </Sidebar.Collapse>

          <Sidebar.Collapse icon={HiOutlineChat} label="Reviews Management">
            <Sidebar.Item  href="#"> lorem</Sidebar.Item>
            <Sidebar.Item  href="#"> lorem</Sidebar.Item>

          </Sidebar.Collapse>

      </Sidebar.ItemGroup>
      <Sidebar.ItemGroup>
        <Sidebar.Item href="#" icon={HiViewBoards}>
          Documentation
        </Sidebar.Item>
        <Sidebar.Item href="#" icon={HiSupport}>
          Help
        </Sidebar.Item>        <Sidebar.Item href="#" icon={HiArrowSmRight}>
          Log In
        </Sidebar.Item>
        <Sidebar.Item href="#" icon={HiTable}>
          Log Out
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
  )
}

export default SideBar